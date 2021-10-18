"use strict";
const port = process.env.PORT ?? 8080
const db_url = process.env.DB_URL ?? "localhost"
const db_user = process.env.DB_USER ?? "admin"
const db_password = process.env.D_PASSWORD ?? "password"


export default {
  port,
  db_url,
  db_user,
  db_password
}