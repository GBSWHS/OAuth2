import { Get, Controller } from '@nestjs/common'

@Controller('oauth2')
export class Oauth2Controller {
  constructor () {}

  @Get('authorize')
  authorize () {
    return 'authorize'
  }

  @Get('token')
  token () {
    return 'token'
  }
}
