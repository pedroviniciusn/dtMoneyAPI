import { Entity, PrimaryColumn, Column, OneToMany, JoinTable } from 'typeorm';
import { Transactions } from '../../transactions/entities/Transactions';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Transactions, (transactions) => transactions.user)
  transactions: Transactions[];
}