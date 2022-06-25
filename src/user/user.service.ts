import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll (): Promise<UserEntity[]> {
    return await this.userRepository.find()
  }

  async findOne (id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id)
  }

  async findByName (name: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ name })
  }

  async create (user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user)
  }

  async update (id: number, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(id, user)
    return await this.userRepository.findOne(id)
  }

  async delete (id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id)
    await this.userRepository.delete(id)
    return user
  }
}
