"use strict";

import IMonitorRepository from "../models/IMonitorRepository";
import MemoryMonitorRepository from "./MemoryMonitorRepository";
import MongoMonitorRepository from "./MongoMonitorRepository";

// repository factory
type MonitorRepositoryType = "mongodb" | "postgres" | "memory"

export function createRepository(type: MonitorRepositoryType): IMonitorRepository {
  let repository: IMonitorRepository
  switch (type) {
    case "mongodb":
      repository = new MongoMonitorRepository()
      break
    case "memory":
      repository = new MemoryMonitorRepository()
      break
    case "postgres":
      throw new Error("Method not implemented.");
      break
    default:
      throw new Error("repository type not valid")
  }
  return repository
}