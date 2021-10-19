"use strict";

import IMonitorItem from "../models/IMonitorItem";
import { CronCommand, CronJob } from "cron";
import axios, { Axios, AxiosError, AxiosResponse, Method } from "axios"
import IMonitorHistoryItem from "../models/IMonitoryHistoryItem";
import IMonitorRepository from "../models/IMonitorRepository";

// schedules cron jobs to monitor monitoritems

export default class SchedulerService {
  // map to hold monitor item id to cron job object
  scheduledItems: Map<string, CronJob>
  repository: IMonitorRepository
  constructor(repository: IMonitorRepository) {
    this.scheduledItems = new Map()
    this.repository = repository
  }

  createMonitorFunction(item: IMonitorItem): Function {
    return async () => {
      let response: AxiosResponse
      const now = new Date()
      let monitorHistoryItem: IMonitorHistoryItem = { id: "", itemId: item.id, timestamp: now, endpoint: item.endpoint, method: item.method, status: 0, statusText: "", failure: false }
      try {
        response = await axios.request({
          url: item.endpoint,
          method: item.method as Method,
          timeout: item.timeout
        })
        monitorHistoryItem.status = response.status
        monitorHistoryItem.statusText = response.statusText
        monitorHistoryItem.failure = false
      } catch (error) {
        monitorHistoryItem.failure = true
        if (axios.isAxiosError(error)) {
          monitorHistoryItem.status = error.response?.status ?? 0
          monitorHistoryItem.statusText = error.response?.statusText ?? "ERROR"
        } else {
          console.error(error)
          monitorHistoryItem.statusText = (error as Error).message
        }

      }
      console.log(JSON.stringify(monitorHistoryItem))
      try {
        this.repository.addMonitorHistoryItem(monitorHistoryItem)
      } catch (error) {
        console.error(error)
      }
    }
  }

  // schedule a function based on the MonitorItem config
  scheduleMonitorItem(item: IMonitorItem) {
    const job = new CronJob(item.schedule,
      this.createMonitorFunction(item) as CronCommand, null, true)
    this.scheduledItems.set(item.id, job)
  }

  // schedule multiple items
  scheduleMonitorItems(items: IMonitorItem[]) {
    for (let item of items) {
      this.scheduleMonitorItem(item)
    }
  }

  // unschedule an item
  unscheduleMonitorItem(id: string) {
    const job = this.scheduledItems.get(id)
    if (job === undefined) {
      throw new Error(`job not defined for: ${id}`)
    }
    job.stop()
    this.scheduledItems.delete(id)
  }

  unscheduleAllItems() {
    for (let id of this.scheduledItems.keys()) {
      this.unscheduleMonitorItem(id)
    }
  }
}