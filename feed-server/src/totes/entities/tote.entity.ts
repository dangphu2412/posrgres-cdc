import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('totes')
export class ToteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    type: 'int',
    default: 0,
  })
  price: number;

  @Column({
    type: 'varchar',
    default: '""',
  })
  bannerURL: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
