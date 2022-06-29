import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ClientEntity } from './client.entity'
import { ClientInputDto } from './dto/client.dto'
import crypto from 'crypto'

@Injectable()
export class ClientService {
  constructor (
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>
  ) {}

  findClient (id: string) {
    const client = this.clientRepository.findOne(id)
    if (!client) throw new NotFoundException()

    return client
  }

  findAllClient (user?: number) {
    const clients = this.clientRepository.find({ userId: user })
    return clients
  }

  async addClient (body: ClientInputDto) {
    const secret = crypto.randomBytes(22).toString('hex')
    const client = await this.clientRepository.insert({ secret, ...body, createdAt: Date.now(), updatedAt: Date.now() })

    return client
  }

  async editClient (id: string, body: ClientInputDto) {
    const client = await this.clientRepository.findOne(id)
    if (!client) throw new NotFoundException()

    return client
  }
}
