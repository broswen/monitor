"use strict";

import IMonitorEvent from "../models/IMonitorEvent";
import ISmsNotificationService from "./ISmsNotificationService";

export default class TwilioNotificationService implements ISmsNotificationService {

  constructor() {

  }

  async sendNotification(phoneNumbers: string[], event: IMonitorEvent) {
  }
}