"use strict";

import MonitorRepository from "../models/IMonitorRepository";

// interact with mongodb using abstract repository interface

export default class MonitorItemService {
  repository: MonitorRepository
  constructor(repository: MonitorRepository) {
    this.repository = repository
  }
}
