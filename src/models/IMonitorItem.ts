export default interface MonitorItem {
  id: string
  endpoint: string
  method: string
  schedule: string
  timeout: number
  emailAlert: boolean
  smsAlert: boolean
  emails: string[]
  phoneNumbers: string[]
}