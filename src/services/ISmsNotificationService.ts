"use strict";

import MonitorEvent from "../models/MonitorEvent";
import { Result } from "../models/Result";

export default interface ISmsNotificationService {
  sendNotification(phoneNumbers: string[], event: MonitorEvent): Promise<Result<boolean>>
}