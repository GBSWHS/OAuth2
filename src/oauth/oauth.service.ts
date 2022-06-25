import { Injectable } from '@nestjs/common'
import { ClientService } from '../client/client.service'
import { ScopeService } from '../scope/scope.service'
import { TokenService } from '../token/token.service'

@Injectable()
export class OauthService {
  constructor (
    private readonly clientService: ClientService,
    private readonly scopeService: ScopeService,
    private readonly tokenService: TokenService
  ) {}

}
