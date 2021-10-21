"use strict";

import MonitorEvent from "../models/MonitorEvent";
import { Result } from "../models/Result";
import ISmsNotificationService from "./ISmsNotificationService";

export default class TwilioNotificationService implements ISmsNotificationService {

  constructor() {

  }

  async sendNotification(phoneNumbers: string[], event: MonitorEvent): Promise<Result<boolean>> {
    return {
      type: "success",
      value: true
    }
  }
}