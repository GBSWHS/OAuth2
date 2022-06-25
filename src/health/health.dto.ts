export interface HealthDto {
  status: 'pass' | 'fail' | 'warn'
  uptime: number
  timestamp: number
}
