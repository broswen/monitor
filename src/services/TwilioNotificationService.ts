"use strict";

import IMonitorEvent from "../models/IMonitorEvent";
import { Result } from "../models/Result";
import ISmsNotificationService from "./ISmsNotificationService";

export default class TwilioNotificationService implements ISmsNotificationService {

  constructor() {

  }

  async sendNotification(phoneNumbers: string[], event: IMonitorEvent): Promise<Result<boolean>> {
    return {
      type: "success",
      value: true
    }
  }
}