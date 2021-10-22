"use strict";

import MonitorEvent from "../models/MonitorEvent";
import MonitorItem from "../models/MonitorItem";
import { Result } from "../models/Result";

export default interface IMonitorRepository {
  getMonitorItem(id: string): Promise<Result<MonitorItem>>
  deleteMonitorItem(id: string): Promise<Result<string>>
  saveMonitorItem(item: MonitorItem): Promise<Result<MonitorItem>>
  getMonitorHistory(id: string, limit: number, offset: number): Promise<Result<MonitorEvent[]>>
  addMonitorHistoryEvent(item: MonitorEvent): Promise<Result<MonitorEvent>>
  getMonitorItems(limit: number, offset: number): Promise<Result<MonitorItem[]>>
  ping(): Promise<Result<boolean>>
}