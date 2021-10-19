"use strict";

import IMonitorHistoryItem from "../models/IMonitoryHistoryItem";
import ISmsNotificationService from "./ISmsNotificationService copy";

export default class TwilioNotificationService implements ISmsNotificationService {

  constructor() {

  }

  async sendNotification(phoneNumbers: string[], event: IMonitorHistoryItem) {
  }
}