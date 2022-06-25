import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('scope')
export class ScopeEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    scope: string

  @Column()
    description: string

  @Column({ default: false })
    idDefault: boolean
}
