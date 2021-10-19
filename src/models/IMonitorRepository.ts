"use strict";

import IMonitorHistoryItem from "./IMonitoryHistoryItem";
import MonitorItem from "./IMonitorItem";

export default interface IMonitorRepository {
  getMonitorItem(id: string): MonitorItem
  deleteMonitorItem(id: string): MonitorItem
  saveMonitorItem(item: MonitorItem): MonitorItem
  getMonitorHistory(id: string): IMonitorHistoryItem[]
  addMonitorHistoryItem(item: IMonitorHistoryItem): IMonitorHistoryItem
  getMonitorItems(limit: number, offset: number): MonitorItem[]
  ping(): boolean
}