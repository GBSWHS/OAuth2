import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
    id: number

  @PrimaryColumn()
    name: string

  @Column()
    password: string

  @Column()
    salt: string
}
