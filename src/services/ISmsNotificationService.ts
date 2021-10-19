"use strict";

import IMonitorHistoryItem from "../models/IMonitoryHistoryItem";

export default interface ISmsNotificationService {
  sendNotification(phoneNumbers: string[], event: IMonitorHistoryItem): Promise<void>
}