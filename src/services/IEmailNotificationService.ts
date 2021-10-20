"use strict";

import IMonitorEvent from "../models/IMonitorEvent";
import { Result } from "../models/Result";

export default interface IEmailNotificationService {
  sendNotification(emails: string[], event: IMonitorEvent): Promise<Result<boolean>>
}