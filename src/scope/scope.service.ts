import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ScopeEntity } from './scope.entity'

@Injectable()
export class ScopeService {
  constructor (
    @InjectRepository(ScopeEntity)
      private readonly scopeRepository: Repository<ScopeEntity>
  ) {}

  async getScopeAll () {
    return await this.scopeRepository.find()
  }

  async getScope (scope: string) {
    const body = await this.scopeRepository.findOne({ scope })
    if (!body) throw new NotFoundException()

    return body
  }

  async validateScope (scope: string[]) {
    const scopes = await this.getScopeAll()

    const validate = scope.filter(x => scopes.filter(v => v.scope === x).length < 1)
    if (validate.length > 0) throw new ForbiddenException()

    return true
  }
}
