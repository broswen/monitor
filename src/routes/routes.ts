"use strict";
import express from "express"
import MonitorItem from "../models/MonitorItem";
import { isError } from "../models/Result";
import IMonitorRepository from "../repository/IMonitorRepository";
import SchedulerService from "../services/SchedulerService";


// export express routes that call controllers or services

export function createMonitorItem(repository: IMonitorRepository, scheduler: SchedulerService) {
  return async (req: express.Request, res: express.Response) => {
    // todo fix overrite of existing item
    let item: MonitorItem = req.body
    const saveItemResult = await repository.saveMonitorItem(item)
    if (isError(saveItemResult)) {
      res.status(saveItemResult.status).json({ message: saveItemResult.message })
    }
    const scheduleResult = scheduler.scheduleMonitorItem(item)
    if (scheduleResult.type === "error") {
      res.status(scheduleResult.status).json({ message: scheduleResult.message })
    }
    res.status(201).json(item)
  }
}

export function updateMonitorItem(repository: IMonitorRepository, scheduler: SchedulerService) {
  return async (req: express.Request, res: express.Response) => {
    let item: MonitorItem = req.body
    const saveItemResult = await repository.saveMonitorItem(item)
    if (isError(saveItemResult)) {
      res.status(saveItemResult.status).json({ message: saveItemResult.message })
    }

    const unscheduleResult = scheduler.unscheduleMonitorItem(item._id?.toString() ?? "")
    if (isError(unscheduleResult)) {
      res.status(unscheduleResult.status).json({ message: unscheduleResult.message })
    }
    const scheduleResult = scheduler.scheduleMonitorItem(item)
    if (isError(scheduleResult)) {
      res.status(scheduleResult.status).json({ message: scheduleResult.message })
    } else {
      res.status(201).json(item)
    }
  }
}

export function getMonitorItem(repository: IMonitorRepository) {
  return async (req: express.Request, res: express.Response) => {
    const id: string = req.params["id"]
    const getItemResult = await repository.getMonitorItem(id)
    if (isError(getItemResult)) {
      res.status(getItemResult.status).json({ message: getItemResult.message })
    } else {
      res.status(200).json(getItemResult.value)
    }
  }
}

export function getMonitorItemHistory(repository: IMonitorRepository) {
  return async (req: express.Request, res: express.Response) => {
    const id: string = req.params["id"]
    const getHistoryResult = await repository.getMonitorHistory(id)
    if (isError(getHistoryResult)) {
      res.status(getHistoryResult.status).json({ message: getHistoryResult.message })
    } else {
      res.status(200).json(getHistoryResult.value)
    }
  }
}

export function deleteMonitorItem(repository: IMonitorRepository, scheduler: SchedulerService) {
  return async (req: express.Request, res: express.Response) => {
    const id: string = req.params["id"]
    const deleteItemResult = await repository.deleteMonitorItem(id)

    if (isError(deleteItemResult)) {
      res.status(deleteItemResult.status).json({ message: deleteItemResult.message })
    } else {
      const unscheduleResult = scheduler.unscheduleMonitorItem(deleteItemResult.value)
      if (isError(unscheduleResult)) {
        res.status(unscheduleResult.status).json({ message: unscheduleResult.message })
      } else {
        res.status(200).json({ _id: deleteItemResult.value })
      }
    }
  }
}

export function getMonitorItems(repository: IMonitorRepository) {
  return async (req: express.Request, res: express.Response) => {
    const limit = req.query.limit as string ?? "100"
    const offset = req.query.offset as string ?? "0"
    const limitValue: number = parseInt(limit)
    const offsetValue: number = parseInt(offset)
    const getItemsResult = await repository.getMonitorItems(limitValue, offsetValue)
    if (isError(getItemsResult)) {
      res.status(getItemsResult.status).json({ message: getItemsResult.message })
    } else {
      res.status(200).json(getItemsResult.value)
    }
  }
}