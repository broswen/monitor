"use strict";

import MonitorEvent from "../models/MonitorEvent";
import MonitorItem from "../models/MonitorItem";
import { Result } from "../models/Result";
import MonitorRepository from "../repository/IMonitorRepository";
import * as mongoDB from "mongodb";
import config from "../config/config";
import { ObjectId } from "mongodb";


export default class MongoMonitorRepository implements MonitorRepository {
  client: mongoDB.MongoClient
  db: mongoDB.Db
  items: mongoDB.Collection
  events: mongoDB.Collection

  constructor() {
    const connString = `mongodb://${config.db_user}:${config.db_password}@${config.db_url}:${config.db_port}`
    console.log(connString)
    this.client = new mongoDB.MongoClient(connString)
    this.client.connect()
    this.db = this.client.db(config.db_name)
    this.items = this.db.collection(config.db_items_col)
    this.events = this.db.collection(config.db_events_col)
  }

  async getMonitorItem(id: string): Promise<Result<MonitorItem>> {
    let item: MonitorItem
    try {
      item = await this.items.findOne({ _id: new ObjectId(id) }) as MonitorItem
    } catch (error) {
      const err = error as Error
      return {
        type: "error",
        error: err,
        status: 500,
        message: err.message
      }
    }

    if (item === null) {
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
    try {
      const result = await this.items.deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
      const err = error as Error
      return {
        type: "error",
        status: 500,
        error: err,
        message: err.message
      }
    }

    return {
      type: "success",
      value: id
    }
  }
  async saveMonitorItem(item: MonitorItem): Promise<Result<MonitorItem>> {

    try {
      const result = await this.items.insertOne(item)
      item._id = result.insertedId
    } catch (error) {
      const err = error as Error
      return {
        type: "error",
        status: 500,
        error: err,
        message: err.message
      }
    }

    return {
      type: "success",
      value: item
    }
  }
  async getMonitorHistory(id: string, limit: number, offset: number): Promise<Result<MonitorEvent[]>> {
    let events: MonitorEvent[]
    try {
      events = (await this.events.find({ itemId: new ObjectId(id) }).skip(offset).limit(limit).sort({ timestamp: -1 }).toArray()) as MonitorEvent[]
    } catch (error) {
      const err = error as Error
      return {
        type: "error",
        error: err,
        status: 500,
        message: err.message
      }
    }

    return {
      type: "success",
      value: events
    }
  }
  async addMonitorHistoryEvent(item: MonitorEvent): Promise<Result<MonitorEvent>> {
    try {
      const result = await this.events.insertOne(item)
      item._id = result.insertedId
    } catch (error) {
      const err = error as Error
      return {
        type: "error",
        status: 500,
        error: err,
        message: err.message
      }
    }

    return {
      type: "success",
      value: item
    }
  }
  async getMonitorItems(limit: number, offset: number): Promise<Result<MonitorItem[]>> {
    let items: MonitorItem[]
    try {
      items = (await this.items.find().skip(offset).limit(limit).sort({ _id: -1 }).toArray()) as MonitorItem[]
    } catch (error) {
      const err = error as Error
      return {
        type: "error",
        error: err,
        status: 500,
        message: err.message
      }
    }

    return {
      type: "success",
      value: items
    }
  }

  async ping(): Promise<Result<boolean>> {
    try {
      await this.client.connect()
    } catch (error) {
      const err = error as Error
      return {
        type: "error",
        error: err,
        status: 500,
        message: err.message
      }
    }
    return {
      type: "success",
      value: true
    }
  }
}