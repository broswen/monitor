"use strict";

import IMonitorEvent from "./IMonitorEvent";
import MonitorItem from "./IMonitorItem";

export default interface IMonitorRepository {
  getMonitorItem(id: string): MonitorItem
  deleteMonitorItem(id: string): MonitorItem
  saveMonitorItem(item: MonitorItem): MonitorItem
  getMonitorHistory(id: string): IMonitorEvent[]
  addMonitorHistoryEvent(item: IMonitorEvent): IMonitorEvent
  getMonitorItems(limit: number, offset: number): MonitorItem[]
  ping(): boolean
}