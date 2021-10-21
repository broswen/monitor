"use strict";
import * as dotenv from "dotenv"
import Server from "./server/server";
dotenv.config();

async function main() {
  const server: Server = new Server()

  server.setRoutes()

  server.start()
}



main()