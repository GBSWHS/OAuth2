import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScopeEntity } from './scope.entity'
import { ScopeService } from './scope.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ScopeEntity])
  ],
  providers: [ScopeService],
  exports: [ScopeService]
})
export class ScopeModule {}
