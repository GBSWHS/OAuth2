import { Module } from '@nestjs/common'

// Oauth Service Controller
import { OauthController } from './oauth.controller'
import { OauthService } from './oauth.service'

// Oauth Service Provider
import { ClientModule } from '../client/client.module'
import { ScopeModule } from '../scope/scope.module'
import { TokenModule } from '../token/token.module'
import { ClientService } from '../client/client.service'

@Module({
  imports: [
    ClientModule,
    ScopeModule,
    TokenModule
  ],
  controllers: [OauthController],
  providers: [OauthService]
})
export class OauthModule {}
