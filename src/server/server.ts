"use strict";

import express from "express"
import { createMonitorItem, deleteMonitorItem, getMonitorItem, getMonitorItemHistory, getMonitorItems, updateMonitorItem } from "../routes/routes";

const app: express.Application = express()

// health check, ping database to check connection
app.get("/healthz", (req: express.Request, res: express.Response) => {
  res.send('OK')
})

app.use(express.json())

// set routes
app.post("/item", createMonitorItem)
app.get("/item/:id", getMonitorItem)
app.put("/item/:id", updateMonitorItem)
app.delete("/item/:id", deleteMonitorItem)
app.get("/item/:id/history", getMonitorItemHistory)
app.get("/item", getMonitorItems)


export default app