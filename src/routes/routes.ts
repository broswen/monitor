"use strict";
import express from "express"
import { validationResult } from "express-validator";
import IMonitorItem from "../models/IMonitorItem";
import IMonitorRepository from "../models/IMonitorRepository";
import { createRepository } from "../repository/MonitorRepository";
import SchedulerService from "../services/SchedulerService";


// export express routes that call controllers or services

export function createMonitorItem(repository: IMonitorRepository, scheduler: SchedulerService) {
  return (req: express.Request, res: express.Response) => {
    // todo fix overrite of existing item
    let item: IMonitorItem = req.body
    item = repository.saveMonitorItem(item)
    scheduler.scheduleMonitorItem(item)
    res.status(201).json(item)
  }
}

export function updateMonitorItem(repository: IMonitorRepository, scheduler: SchedulerService) {
  return (req: express.Request, res: express.Response) => {
    let item: IMonitorItem = req.body
    item = repository.saveMonitorItem(item)
    scheduler.unscheduleMonitorItem(item.id)
    scheduler.scheduleMonitorItem(item)
    res.status(201).json(item)
  }
}

export function getMonitorItem(repository: IMonitorRepository) {
  return (req: express.Request, res: express.Response) => {
    const id: string = req.params["id"]
    const item = repository.getMonitorItem(id)
    res.status(200).json(item)
  }
}

export function getMonitorItemHistory(repository: IMonitorRepository) {
  return (req: express.Request, res: express.Response) => {
    const id: string = req.params["id"]
    const history = repository.getMonitorHistory(id)
    res.status(200).json(history)
  }
}

export function deleteMonitorItem(repository: IMonitorRepository, scheduler: SchedulerService) {
  return (req: express.Request, res: express.Response) => {
    const id: string = req.params["id"]
    const item = repository.deleteMonitorItem(id)
    scheduler.unscheduleMonitorItem(item.id)
    res.status(200).json(item)
  }
}

export function getMonitorItems(repository: IMonitorRepository) {
  return (req: express.Request, res: express.Response) => {
    const limit = req.query.limit as string ?? "100"
    const offset = req.query.offset as string ?? "0"
    const limitValue: number = parseInt(limit)
    const offsetValue: number = parseInt(offset)
    const items = repository.getMonitorItems(limitValue, offsetValue)
    res.status(200).json(items)
  }
}