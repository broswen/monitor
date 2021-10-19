"use strict";

import IMonitorHistoryItem from "../models/IMonitoryHistoryItem";

export default interface IEmailNotificationService {
  sendNotification(emails: string[], event: IMonitorHistoryItem): Promise<void>
}