import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../user/user.entity'

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

  @Column({ type: 'varchar', length: 255 })
    secret: string

  @Column({ type: 'varchar', length: 255 })
    name: string

  @Column({ type: 'longtext', nullable: true })
    description?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
    logo?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
    website?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
    redirectUri?: string

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date

  @ManyToOne((type: UserEntity) => UserEntity)
    user: UserEntity
}
