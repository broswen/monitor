"use strict";
import express from "express"
import IMonitorItem from "../models/IMonitorItem";
import { isError } from "../models/Result";
import IMonitorRepository from "../repository/IMonitorRepository";
import SchedulerService from "../services/SchedulerService";


// export express routes that call controllers or services

export function createMonitorItem(repository: IMonitorRepository, scheduler: SchedulerService) {
  return (req: express.Request, res: express.Response) => {
    // todo fix overrite of existing item
    let item: IMonitorItem = req.body
    const saveItemResult = repository.saveMonitorItem(item)
    if (saveItemResult.type === "error") {
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
  return (req: express.Request, res: express.Response) => {
    let item: IMonitorItem = req.body
    const saveItemResult = repository.saveMonitorItem(item)
    if (isError(saveItemResult)) {
      res.status(saveItemResult.status).json({ message: saveItemResult.message })
    }

    const unscheduleResult = scheduler.unscheduleMonitorItem(item.id)
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
  return (req: express.Request, res: express.Response) => {
    const id: string = req.params["id"]
    const getItemResult = repository.getMonitorItem(id)
    if (isError(getItemResult)) {
      res.status(getItemResult.status).json({ message: getItemResult.message })
    } else {
      res.status(200).json(getItemResult.value)
    }
  }
}

export function getMonitorItemHistory(repository: IMonitorRepository) {
  return (req: express.Request, res: express.Response) => {
    const id: string = req.params["id"]
    const getHistoryResult = repository.getMonitorHistory(id)
    if (isError(getHistoryResult)) {
      res.status(getHistoryResult.status).json({ message: getHistoryResult.message })
    } else {
      res.status(200).json(getHistoryResult.value)
    }
  }
}

export function deleteMonitorItem(repository: IMonitorRepository, scheduler: SchedulerService) {
  return (req: express.Request, res: express.Response) => {
    const id: string = req.params["id"]
    const deleteItemResult = repository.deleteMonitorItem(id)

    if (isError(deleteItemResult)) {
      res.status(deleteItemResult.status).json({ message: deleteItemResult.message })
    } else {
      const unscheduleResult = scheduler.unscheduleMonitorItem(deleteItemResult.value.id)
      if (isError(unscheduleResult)) {
        res.status(unscheduleResult.status).json({ message: unscheduleResult.message })
      } else {
        res.status(200).json(deleteItemResult)
      }
    }

  }
}

export function getMonitorItems(repository: IMonitorRepository) {
  return (req: express.Request, res: express.Response) => {
    const limit = req.query.limit as string ?? "100"
    const offset = req.query.offset as string ?? "0"
    const limitValue: number = parseInt(limit)
    const offsetValue: number = parseInt(offset)
    const getItemsResult = repository.getMonitorItems(limitValue, offsetValue)
    if (isError(getItemsResult)) {
      res.status(getItemsResult.status).json({ message: getItemsResult.message })
    } else {
      res.status(200).json(getItemsResult.value)
    }
  }
}