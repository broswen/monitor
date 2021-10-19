export default interface IMonitorHistoryItem {
  itemId: string
  id: string
  endpoint: string
  timestamp: Date
  failure: boolean
  status: number
  statusText: string
  method: string
  responseBody?: string
}