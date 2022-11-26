import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../accounts/entities/User';

@Entity('transactions')
export class Transactions {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column()
  category: string;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}