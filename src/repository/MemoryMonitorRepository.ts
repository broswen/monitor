"use strict";

import IMonitorHistoryItem from "../models/IMonitoryHistoryItem";
import IMonitorItem from "../models/IMonitorItem";
import MonitorRepository from "../models/IMonitorRepository";


export default class MemoryMonitorRepository implements MonitorRepository {
  items: Map<string, IMonitorItem>
  history: Map<string, IMonitorHistoryItem[]>
  constructor() {
    this.items = new Map()
    this.history = new Map()
  }

  getMonitorItem(id: string): IMonitorItem {
    const item = this.items.get(id)
    if (item === undefined) {
      throw new Error("item not found")
    }
    return item
  }

  deleteMonitorItem(id: string): IMonitorItem {
    const item = this.getMonitorItem(id)
    this.items.delete(id)
    this.history.delete(id)
    return item
  }

  saveMonitorItem(item: IMonitorItem): IMonitorItem {
    this.items.set(item.id, item)
    if (this.history.get(item.id) === undefined) {
      this.history.set(item.id, [])
    }
    return item
  }
  getMonitorHistory(id: string): IMonitorHistoryItem[] {
    const item = this.getMonitorItem(id)
    const history = this.history.get(id)
    if (history === undefined) {
      throw new Error("history not found")
    }
    return history
  }

  addMonitorHistoryItem(item: IMonitorHistoryItem): IMonitorHistoryItem {
    this.history.get(item.itemId)?.push(item)
    return item
  }

  getMonitorItems(limit: number, offset: number): IMonitorItem[] {
    return Array.from(this.items.values()).slice(offset, limit)
  }

  ping(): boolean {
    return true
  }
}