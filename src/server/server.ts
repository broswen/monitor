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
import config from "../config/config";

export default class Server {

  app: express.Application
  repository: IMonitorRepository
  emailNotifier: IEmailNotificationService
  scheduler: SchedulerService

  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.repository = createRepository("mongodb")

    this.emailNotifier = new SendGridNotificationService()
    this.scheduler = new SchedulerService(this.repository, this.emailNotifier)

    this.setRoutes()
  }

  setRoutes() {
    this.app.get("/healthz", (req: express.Request, res: express.Response) => {
      res.send('OK')
    })

    this.app.post(
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
      createMonitorItem(this.repository, this.scheduler)
    )

    this.app.get(
      "/item/:id",
      param("id").isString().isLength({ min: 1 }),
      validator,
      getMonitorItem(this.repository)
    )

    this.app.put("/item/:id",
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
      updateMonitorItem(this.repository, this.scheduler)
    )

    this.app.delete(
      "/item/:id",
      param("id").isString().isLength({ min: 1 }),
      validator,
      deleteMonitorItem(this.repository, this.scheduler)
    )

    this.app.get(
      "/item/:id/history",
      param("id").isString().isLength({ min: 1 }),
      validator,
      getMonitorItemHistory(this.repository)
    )

    this.app.get("/item", getMonitorItems(this.repository))
  }

  async start() {

    const getItemsResult = await this.repository.getMonitorItems(100000000, 0)
    if (isError(getItemsResult)) {
      throw getItemsResult.error
    } else {
      const scheduleResult = await this.scheduler.scheduleMonitorItems(getItemsResult.value)
      if (isError(scheduleResult)) {
        throw scheduleResult.error
      }
    }

    this.app.listen(config.port, () => {
      console.log(`listening on http://localhost:${config.port}`)
    })
  }

}

const validator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next()
}
