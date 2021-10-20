"use strict";

import IMonitorEvent from "../models/IMonitorEvent";
import MonitorItem from "../models/IMonitorItem";
import { Result } from "../models/Result";

export default interface IMonitorRepository {
  getMonitorItem(id: string): Result<MonitorItem>
  deleteMonitorItem(id: string): Result<MonitorItem>
  saveMonitorItem(item: MonitorItem): Result<MonitorItem>
  getMonitorHistory(id: string): Result<IMonitorEvent[]>
  addMonitorHistoryEvent(item: IMonitorEvent): Result<IMonitorEvent>
  getMonitorItems(limit: number, offset: number): Result<MonitorItem[]>
  ping(): Result<boolean>
}