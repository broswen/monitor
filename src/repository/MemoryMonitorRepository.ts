"use strict";

import IMonitorEvent from "../models/IMonitorEvent";
import IMonitorItem from "../models/IMonitorItem";
import { Result } from "../models/Result";
import MonitorRepository from "./IMonitorRepository";


export default class MemoryMonitorRepository implements MonitorRepository {
  items: Map<string, IMonitorItem>
  history: Map<string, IMonitorEvent[]>
  constructor() {
    this.items = new Map()
    this.history = new Map()
  }

  getMonitorItem(id: string): Result<IMonitorItem> {
    const item = this.items.get(id)
    if (item === undefined) {
      const err = new Error("item not found")
      return {
        type: "error",
        error: err,
        status: 404,
        message: err.message
      }
    }
    return {
      type: "success",
      value: item
    }
  }

  deleteMonitorItem(id: string): Result<IMonitorItem> {
    const item = this.getMonitorItem(id)
    if (item.type === "error") {
      return item
    }
    this.items.delete(id)
    this.history.delete(id)
    return {
      type: "success",
      value: item.value
    }
  }

  saveMonitorItem(item: IMonitorItem): Result<IMonitorItem> {
    this.items.set(item.id, item)
    if (this.history.get(item.id) === undefined) {
      this.history.set(item.id, [])
    }
    return {
      type: "success",
      value: item
    }
  }

  getMonitorHistory(id: string): Result<IMonitorEvent[]> {
    const item = this.getMonitorItem(id)
    if (item.type === "error") {
      return item
    }
    const history = this.history.get(id)
    if (history === undefined) {
      const err = new Error("history not found")
      return {
        type: "error",
        error: err,
        status: 404,
        message: err.message
      }
    }
    return {
      type: "success",
      value: history
    }
  }

  addMonitorHistoryEvent(item: IMonitorEvent): Result<IMonitorEvent> {
    this.history.get(item.itemId)?.push(item)
    return {
      type: "success",
      value: item
    }
  }

  getMonitorItems(limit: number, offset: number): Result<IMonitorItem[]> {
    return {
      type: "success",
      value: Array.from(this.items.values()).slice(offset, limit)
    }
  }

  ping(): Result<boolean> {
    return {
      type: "success",
      value: true
    }
  }
}