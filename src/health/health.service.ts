import { Injectable } from '@nestjs/common'
import { HealthDto } from './health.dto'

@Injectable()
export class HealthService {
  async getHealth (): Promise<HealthDto> {
    return {
      status: 'pass',
      uptime: Math.round(process.uptime() * 1000),
      timestamp: Date.now()
    }
  }
}
