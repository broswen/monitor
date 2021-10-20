"use strict";

import IMonitorEvent from "../models/IMonitorEvent";
import IMonitorItem from "../models/IMonitorItem";
import { Result } from "../models/Result";
import MonitorRepository from "../repository/IMonitorRepository";


export default class MongoMonitorRepository implements MonitorRepository {
  constructor() {

  }

  getMonitorItem(id: string): Result<IMonitorItem> {
    throw new Error("Method not implemented.");
  }
  deleteMonitorItem(id: string): Result<IMonitorItem> {
    throw new Error("Method not implemented.");
  }
  saveMonitorItem(item: IMonitorItem): Result<IMonitorItem> {
    throw new Error("Method not implemented.");
  }
  getMonitorHistory(id: string): Result<IMonitorEvent[]> {
    throw new Error("Method not implemented.");
  }
  addMonitorHistoryEvent(item: IMonitorEvent): Result<IMonitorEvent> {
    throw new Error("Method not implemented.");
  }
  getMonitorItems(limit: number, offset: number): Result<IMonitorItem[]> {
    throw new Error("Method not implemented.");
  }
  ping(): Result<boolean> {
    throw new Error("Method not implemented.");
  }
}