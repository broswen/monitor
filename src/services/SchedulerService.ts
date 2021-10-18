"use strict";

import MonitorItem from "../models/IMonitorItem";
import { CronJob } from "cron";

// schedules cron jobs to monitor monitoritems

export default class SchedulerService {
  // map to hold monitor item id to cron job object
  scheduledItems: Map<string, CronJob>
  constructor() {
    this.scheduledItems = new Map()
  }

  // schedule a function based on the MonitorItem config
  scheduleMonitorItem(item: MonitorItem) {
    const job = new CronJob(item.schedule, async function () {
      console.log(item)
    }, null, true)
    this.scheduledItems.set(item.id, job)
  }

  // schedule multiple items
  scheduleMonitorItems(items: MonitorItem[]) {
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