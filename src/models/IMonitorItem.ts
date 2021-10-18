export default interface MonitorItem {
  id: string
  endpoint: string
  verb: string
  schedule: string
  timeout: number
  successCodes: number[]
  emailAlert: boolean
  smsAlert: boolean
  emails: string[]
  phoneNumbers: string[]
}