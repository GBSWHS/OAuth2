import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthorizationCodeDto, AccessTokenDto } from './dto/token.dto'
import { AccessTokenEntity, AuthorizationCodeEntity, RefreshTokenEntity } from './token.entity'
import crypto from 'crypto'

@Injectable()
export class TokenService {
  constructor (
    @InjectRepository(AuthorizationCodeEntity)
      private readonly authorizationCodeRepository: Repository<AuthorizationCodeEntity>,
    @InjectRepository(AccessTokenEntity)
      private readonly accessTokenRepository: Repository<AccessTokenEntity>,
    @InjectRepository(RefreshTokenEntity)
      private readonly refreshTokenRepository: Repository<RefreshTokenEntity>
  ) {}

  generateAuthorizationCode (body: AuthorizationCodeDto): string {
    const { scope, clientId, userId, redirectUri } = body
    const code = crypto.randomBytes(22).toString('hex')
    this.authorizationCodeRepository.insert({
      code, redirectUri, clientId, userId
    })

    return code
  }

  async getAuthorizationCode (code: string) {
  }

  generateAccessToken (body: AccessTokenDto) {
  }

  async getAccessToken (token: string) {
  }
}
