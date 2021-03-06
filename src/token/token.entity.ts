import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { ClientEntity } from '../client/client.entity'
import { UserEntity } from '../user/user.entity'

@Entity('authorization_code')
export class AuthorizationCodeEntity {
  @Column({ length: 22 })
    code: string

  @Column()
    redirectUri: string

  @Column({ type: 'timestamp' })
    expires: Date

  @PrimaryColumn({ name: 'user_id' })
    userId: number

  @OneToMany(() => UserEntity, (u) => u.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
    user: UserEntity

  @PrimaryColumn({ name: 'client_id' })
    clientId: string

  @OneToOne(() => ClientEntity, (c) => c.id, { eager: true })
  @JoinColumn({ name: 'client_id' })
    client: ClientEntity
}

@Entity('access_token')
export class AccessTokenEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    token: string

  @Column({ type: 'timestamp' })
    expires: Date

  @Column({ name: 'user_id' })
    userId: number

  @OneToMany(() => UserEntity, (u) => u.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
    user: UserEntity

  @Column({ name: 'client_id' })
    clientId: string

  @OneToOne(() => ClientEntity, (c) => c.id, { eager: true })
  @JoinColumn({ name: 'client_id' })
    client: ClientEntity
}

@Entity('refresh_token')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    token: string

  @Column({ type: 'timestamp' })
    expires: Date

  @Column({ name: 'user_id' })
    userId: number

  @OneToMany(() => UserEntity, (u) => u.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
    user: UserEntity

  @Column({ name: 'client_id' })
    clientId: string

  @OneToOne(() => ClientEntity, (c) => c.id, { eager: true })
  @JoinColumn({ name: 'client_id' })
    client: ClientEntity
}
