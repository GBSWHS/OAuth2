import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccessTokenEntity, AuthorizationCodeEntity, RefreshTokenEntity } from './token.entity'
import { TokenService } from './token.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorizationCodeEntity, AccessTokenEntity, RefreshTokenEntity])
  ],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
