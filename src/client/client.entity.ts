import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from '../user/user.entity'

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string

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

  @Column({ name: 'redirect_uri', type: 'varchar', length: 255, nullable: true })
    redirectUri?: string

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: number

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: number

  @Column({ name: 'user_id' })
    userId: number

  // @OneToMany(() => UserEntity, (c) => c.id, { eager: true })
  // @JoinColumn({ name: 'user_id' })
  //  user: UserEntity
}
