"use strict";

import MonitorEvent from "../models/MonitorEvent";
import { Result } from "../models/Result";

export default interface IEmailNotificationService {
  sendNotification(emails: string[], event: MonitorEvent): Promise<Result<boolean>>
}