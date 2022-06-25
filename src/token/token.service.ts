import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthorizationCodeDto, AccessTokenDto } from './dto/token.dto'
import { AccessTokenEntity, AuthorizationCodeEntity, RefreshTokenEntity } from './token.entity'

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
    this.authorizationCodeRepository.insert(body)
  }

  async getAuthorizationCode (code: string) {
  }

  generateAccessToken (body: AccessTokenDto) {
  }

  async getAccessToken (token: string) {
  }
}
