import { Controller, Get } from '@nestjs/common'
import { ResponseBody } from '../interfaces/ResponseBody'
import { HealthDto } from './health.dto'
import { HealthService } from './health.service'

@Controller('health')
export class HealthController {
  constructor (
    private readonly healthService: HealthService
  ) {}

  @Get()
  async getHealth (): Promise<ResponseBody<HealthDto>> {
    return {
      success: true,
      data: await this.healthService.getHealth()
    }
  }
}
