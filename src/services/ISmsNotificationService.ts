"use strict";

import IMonitorEvent from "../models/IMonitorEvent";

export default interface ISmsNotificationService {
  sendNotification(phoneNumbers: string[], event: IMonitorEvent): Promise<void>
}