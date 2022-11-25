import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../accounts/entities/User';

@Entity()
export class Transactions {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column()
  category: string;

  @Column()
  type: string;
}