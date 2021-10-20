"use strict";

import IMonitorItem from "../models/IMonitorItem";
import IMonitorEvent from "../models/IMonitorEvent";
import IEmailNotificationService from "./IEmailNotificationService";

import sgMail from "@sendgrid/mail"
import config from "../config/config";
import { Result } from "../models/Result";

export default class SendGridNotificationService implements IEmailNotificationService {

  constructor() {
    sgMail.setApiKey(config.sendgrid_api_key)
  }

  async sendNotification(emails: string[], event: IMonitorEvent): Promise<Result<boolean>> {
    const msg = {
      to: emails,
      from: config.noreply_email,
      subject: `Monitor Error: ${event.endpoint}`,
      text: `Monitoring Failure:
      ${event.timestamp.toISOString()}
      ${event.endpoint}: ${event.status} ${event.statusText}`,
      html: `Monitoring Failure:
      ${event.timestamp.toISOString()}
      ${event.endpoint}: ${event.status} ${event.statusText}`,
    }
    try {
      await sgMail.send(msg)
    } catch (error) {
      console.error(error)
      const err = error as Error
      return {
        type: "error",
        status: 500,
        error: err,
        message: err.message
      }
    }
    return {
      type: "success",
      value: true
    }
  }
}