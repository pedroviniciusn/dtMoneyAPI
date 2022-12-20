import { 
  Entity, 
  PrimaryColumn,
  Column, 
  OneToMany, 
  CreateDateColumn, 
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuidV4 } from 'uuid';

import { Transactions } from '@modules/transactions/entities/Transactions';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 30
  })
  name: string;

  @Column({
    length: 30
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Transactions, (transactions) => transactions.user)
  transactions: Transactions[];

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