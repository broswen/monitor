"use strict";

import express from "express"
import IMonitorRepository from "../repository/IMonitorRepository";
import { createRepository } from "../repository/MonitorRepository";
import { createMonitorItem, deleteMonitorItem, getMonitorItem, getMonitorItemHistory, getMonitorItems, updateMonitorItem } from "../routes/routes";
import SchedulerService from "../services/SchedulerService";
import { body, param, validationResult } from 'express-validator';
import IEmailNotificationService from "../services/IEmailNotificationService";
import SendGridNotificationService from "../services/SendGridNotificationService";
import { isError } from "../models/Result";

const app: express.Application = express()

const repository: IMonitorRepository = createRepository("memory")
const emailNotifier: IEmailNotificationService = new SendGridNotificationService()
const scheduler: SchedulerService = new SchedulerService(repository, emailNotifier)

// health check, ping database to check connection
app.get("/healthz", (req: express.Request, res: express.Response) => {
  repository.ping()
  res.send('OK')
})

app.use(express.json())

// schedule pre-existing items
const getItemsResult = repository.getMonitorItems(100000000, 0)
if (isError(getItemsResult)) {
  throw getItemsResult.error
} else {
  const scheduleResult = scheduler.scheduleMonitorItems(getItemsResult.value)
  if (isError(scheduleResult)) {
    throw scheduleResult.error
  }
}



const validator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next()
}

// set routes
app.post(
  "/item",
  body("endpoint").isURL(),
  body("method").isString().isLength({ min: 1 }),
  body("schedule").isString().isLength({ min: 9 }),
  body("timeout").isInt({ min: 1 }),
  body("emailAlert").isBoolean(),
  body("smsAlert").isBoolean(),
  body("emails").isArray(),
  body("phoneNumbers").isArray(),
  validator,
  createMonitorItem(repository, scheduler)
)

app.get(
  "/item/:id",
  param("id").isString().isLength({ min: 1 }),
  validator,
  getMonitorItem(repository)
)

app.put("/item/:id",
  body("endpoint").isURL(),
  body("method").isString().isLength({ min: 1 }),
  body("schedule").isString().isLength({ min: 9 }),
  body("timeout").isInt({ min: 1 }),
  body("emailAlert").isBoolean(),
  body("smsAlert").isBoolean(),
  body("emails").isArray(),
  body("phoneNumbers").isArray(),
  param("id").isString().isLength({ min: 1 }),
  validator,
  updateMonitorItem(repository, scheduler)
)

app.delete(
  "/item/:id",
  param("id").isString().isLength({ min: 1 }),
  validator,
  deleteMonitorItem(repository, scheduler)
)

app.get(
  "/item/:id/history",
  param("id").isString().isLength({ min: 1 }),
  validator,
  getMonitorItemHistory(repository)
)

app.get("/item", getMonitorItems(repository))


export default app