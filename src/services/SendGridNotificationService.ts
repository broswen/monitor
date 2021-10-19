"use strict";

import IMonitorItem from "../models/IMonitorItem";
import IMonitorHistoryItem from "../models/IMonitoryHistoryItem";
import IEmailNotificationService from "./IEmailNotificationService";

import sgMail from "@sendgrid/mail"
import config from "../config/config";

export default class SendGridNotificationService implements IEmailNotificationService {

  constructor() {
    sgMail.setApiKey(config.sendgrid_api_key)
  }

  async sendNotification(emails: string[], event: IMonitorHistoryItem) {
    const msg = {
      to: emails,
      from: config.noreply_email,
      subject: `Monitor Error: ${event.endpoint}`,
      text: `Monitoring Failure:\n${event.timestamp.toISOString()}\n ${event.endpoint}: ${event.status} ${event.statusText}`,
      html: `Monitoring Failure:\n${event.timestamp.toISOString()}\n ${event.endpoint}: ${event.status} ${event.statusText}`,
    }
    try {
      await sgMail.send(msg)
    } catch (error) {
      console.error(error)
    }
  }
}