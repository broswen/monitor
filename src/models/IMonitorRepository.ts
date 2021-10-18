"use strict";

import MonitorHistoryItem from "./IMonitoryHistoryItem";
import MonitorItem from "./IMonitorItem";

export default interface IMonitorRepository {
  getMonitorItem(id: string): MonitorItem
  deleteMonitorItem(id: string): MonitorItem
  saveMonitorItem(item: MonitorItem): MonitorItem
  getMonitorHistory(id: string): MonitorHistoryItem[]
  getMonitorItems(limit: number, offset: number): MonitorItem[]
}