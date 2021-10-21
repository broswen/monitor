"use strict";
const port = process.env.PORT ?? 8080
const db_url = process.env.DB_URL ?? "localhost"
const db_port = process.env.DB_PORT ?? "27017"
const db_user = process.env.DB_USER ?? "admin"
const db_password = process.env.DB_PASSWORD ?? "password"
const db_name = process.env.DB_NAME ?? "monitor"
const db_items_col = process.env.DB_COL ?? "monitor_items"
const db_events_col = process.env.DB_COL ?? "monitor_events"
const sendgrid_api_key = process.env.SENDGRID_API_KEY ?? "null"
const noreply_email = process.env.NOREPLY_EMAIL ?? "noreply@broswen.com"

export default {
  port,
  db_url,
  db_user,
  db_password,
  sendgrid_api_key,
  noreply_email,
  db_items_col,
  db_events_col,
  db_name,
  db_port
}