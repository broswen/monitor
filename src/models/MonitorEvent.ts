import { ObjectId } from "bson";

export default class MonitorEvent {
  constructor(
    public itemId: ObjectId,
    public endpoint: string,
    public timestamp: Date,
    public failure: boolean,
    public status: number,
    public statusText: string,
    public method: string,
    public responseBody?: string,
    public _id?: ObjectId,
  ) { }
}