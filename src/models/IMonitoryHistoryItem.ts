export default interface MonitorHistoryItem {
  itemId: string
  id: string
  timestamp: Date
  failure: boolean
  responseCode: number
  responseBody?: string
}