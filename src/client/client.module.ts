import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Client } from './client.entity'
import { ClientService } from './client.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Client])
  ],
  providers: [ClientService],
  exports: [ClientService]
})
export class ClientModule {}
