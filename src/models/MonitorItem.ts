import { ObjectId } from "mongodb";

export default class MonitorItem {
  constructor(
    public endpoint: string,
    public method: string,
    public schedule: string,
    public timeout: number,
    public emailAlert: boolean,
    public smsAlert: boolean,
    public emails: string[],
    public phoneNumbers: string[],
    public _id?: ObjectId,
  ) { }
}
