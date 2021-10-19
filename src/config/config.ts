"use strict";
const port = process.env.PORT ?? 8080
const db_url = process.env.DB_URL ?? "localhost"
const db_user = process.env.DB_USER ?? "admin"
const db_password = process.env.D_PASSWORD ?? "password"
const sendgrid_api_key = process.env.SENDGRID_API_KEY ?? "null"
const noreply_email = process.env.NOREPLY_EMAIL ?? "noreply@broswen.com"

export default {
  port,
  db_url,
  db_user,
  db_password,
  sendgrid_api_key,
  noreply_email
}