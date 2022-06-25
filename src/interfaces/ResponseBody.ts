
export interface ResponseBody<Data> {
  success: boolean
  error?: string
  data?: Data
}
