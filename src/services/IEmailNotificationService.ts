"use strict";

import IMonitorEvent from "../models/IMonitorEvent";

export default interface IEmailNotificationService {
  sendNotification(emails: string[], event: IMonitorEvent): Promise<void>
}