"use strict";

import IMonitorEvent from "../models/IMonitorEvent";
import { Result } from "../models/Result";

export default interface ISmsNotificationService {
  sendNotification(phoneNumbers: string[], event: IMonitorEvent): Promise<Result<boolean>>
}