import { 
  Entity, 
  PrimaryColumn, 
  Column, 
  ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

import { User } from '../../accounts/entities/User';

@Entity('transactions')
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}