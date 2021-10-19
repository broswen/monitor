"use strict";

import IMonitorEvent from "../models/IMonitorEvent";
import IMonitorItem from "../models/IMonitorItem";
import MonitorRepository from "../models/IMonitorRepository";


export default class MongoMonitorRepository implements MonitorRepository {
  constructor() {

  }

  getMonitorItem(id: string): IMonitorItem {
    throw new Error("Method not implemented.");
  }
  deleteMonitorItem(id: string): IMonitorItem {
    throw new Error("Method not implemented.");
  }
  saveMonitorItem(item: IMonitorItem): IMonitorItem {
    throw new Error("Method not implemented.");
  }
  getMonitorHistory(id: string): IMonitorEvent[] {
    throw new Error("Method not implemented.");
  }
  addMonitorHistoryEvent(item: IMonitorEvent): IMonitorEvent {
    throw new Error("Method not implemented.");
  }
  getMonitorItems(limit: number, offset: number): IMonitorItem[] {
    throw new Error("Method not implemented.");
  }
  ping(): boolean {
    throw new Error("Method not implemented.");
  }
}