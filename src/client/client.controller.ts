import { Controller, Get } from '@nestjs/common'
import { ResponseBody } from '../interfaces/ResponseBody'
import { ClientService } from './client.service'

@Controller('client')
export class ClientController {
  constructor (
    private readonly clientService: ClientService
  ) {}

  @Get('/')
  findClient (): ResponseBody<any> {
    return {
      success: true,
      data: this.clientService.findAllClient()
    }
  }
}
