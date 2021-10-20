"use strict";

import IMonitorRepository from "../repository/IMonitorRepository";
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
      // uses in memory datastructures for testing
      repository = new MemoryMonitorRepository()
      break
    case "postgres":
      // TODO: setup repository for postgres
      throw new Error("Method not implemented.");
      break
    default:
      throw new Error("repository type not valid")
  }
  return repository
}