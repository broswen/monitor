"use strict";
import express from "express"
import IMonitorItem from "../models/IMonitorItem";
import IMonitorRepository from "../models/IMonitorRepository";
import { createRepository } from "../repository/MonitorRepository";

// export express routes that call controllers or services

const repository: IMonitorRepository = createRepository("memory")

export const createMonitorItem = (req: express.Request, res: express.Response) => {
  let item: IMonitorItem = req.body
  item = repository.saveMonitorItem(item)
  res.status(201).json(item)
}

export const updateMonitorItem = (req: express.Request, res: express.Response) => {
  let item: IMonitorItem = req.body
  item = repository.saveMonitorItem(item)
  res.status(201).json(item)
}

export const getMonitorItem = (req: express.Request, res: express.Response) => {
  const id: string = req.params["id"]
  const item = repository.getMonitorItem(id)
  res.status(200).json(item)
}

export const getMonitorItemHistory = (req: express.Request, res: express.Response) => {
  const id: string = req.params["id"]
  const history = repository.getMonitorHistory(id)
  res.status(200).json(history)
}

export const deleteMonitorItem = (req: express.Request, res: express.Response) => {
  const id: string = req.params["id"]
  const item = repository.deleteMonitorItem(id)
  res.status(200).json(item)
}

export const getMonitorItems = (req: express.Request, res: express.Response) => {
  const limit = req.query.limit as string ?? "100"
  const offset = req.query.offset as string ?? "0"
  const limitValue: number = parseInt(limit)
  const offsetValue: number = parseInt(offset)
  const items = repository.getMonitorItems(limitValue, offsetValue)
  res.status(200).json(items)
}