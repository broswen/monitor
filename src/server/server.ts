"use strict";

import express from "express"
import IMonitorRepository from "../models/IMonitorRepository";
import { createRepository } from "../repository/MonitorRepository";
import { createMonitorItem, deleteMonitorItem, getMonitorItem, getMonitorItemHistory, getMonitorItems, updateMonitorItem } from "../routes/routes";
import SchedulerService from "../services/SchedulerService";

const app: express.Application = express()

const repository: IMonitorRepository = createRepository("memory")
const scheduler: SchedulerService = new SchedulerService(repository)

// health check, ping database to check connection
app.get("/healthz", (req: express.Request, res: express.Response) => {
  repository.ping()
  res.send('OK')
})

app.use(express.json())

// set routes
app.post("/item", createMonitorItem(repository, scheduler))
app.get("/item/:id", getMonitorItem(repository))
app.put("/item/:id", updateMonitorItem(repository, scheduler))
app.delete("/item/:id", deleteMonitorItem(repository, scheduler))
app.get("/item/:id/history", getMonitorItemHistory(repository))
app.get("/item", getMonitorItems(repository))


export default app