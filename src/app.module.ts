import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { TypeOrmModule } from '@nestjs/typeorm'

import { OauthModule } from './oauth/oauth.module'
import { UserModule } from './user/user.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: ['dist/**/*.entity.{ts,js}'],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('throttler.ttl'),
        max: configService.get('throttler.max')
      }),
      inject: [ConfigService]
    }),
    OauthModule,
    UserModule,
    HealthModule
  ]
})
export class AppModule {}
