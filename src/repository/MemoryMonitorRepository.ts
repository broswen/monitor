"use strict";

import { ObjectId } from "bson";
import MonitorEvent from "../models/MonitorEvent";
import MonitorItem from "../models/MonitorItem";
import { Result } from "../models/Result";
import MonitorRepository from "./IMonitorRepository";


export default class MemoryMonitorRepository implements MonitorRepository {
  items: Map<string, MonitorItem>
  history: Map<string, MonitorEvent[]>
  constructor() {
    this.items = new Map()
    this.history = new Map()
  }

  async getMonitorItem(id: string): Promise<Result<MonitorItem>> {
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

  async deleteMonitorItem(id: string): Promise<Result<string>> {
    const item = await this.getMonitorItem(id)
    if (item.type === "error") {
      return item
    }
    this.items.delete(id)
    this.history.delete(id)
    return {
      type: "success",
      value: id
    }
  }

  async saveMonitorItem(item: MonitorItem): Promise<Result<MonitorItem>> {
    item._id = new ObjectId;
    this.items.set(item._id.toString(), item)
    if (this.history.get(item._id.toString()) === undefined) {
      this.history.set(item._id.toString(), [])
    }
    return {
      type: "success",
      value: item
    }
  }

  async getMonitorHistory(id: string, limit: number, offset: number): Promise<Result<MonitorEvent[]>> {
    const item = await this.getMonitorItem(id)
    if (item.type === "error") {
      return item
    }
    const history = this.history.get(id)?.slice(offset, limit)
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

  async addMonitorHistoryEvent(item: MonitorEvent): Promise<Result<MonitorEvent>> {
    this.history.get(item.itemId.toString())?.push(item)
    return {
      type: "success",
      value: item
    }
  }

  async getMonitorItems(limit: number, offset: number): Promise<Result<MonitorItem[]>> {
    return {
      type: "success",
      value: Array.from(this.items.values()).slice(offset, limit)
    }
  }

  async ping(): Promise<Result<boolean>> {
    return {
      type: "success",
      value: true
    }
  }
}