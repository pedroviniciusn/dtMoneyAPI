import { Entity, PrimaryColumn, Column, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Transactions } from '../../transactions/entities/Transactions';

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

  @Column({
    length: 16
  })
  password: string;

  @ManyToMany(() => Transactions)
  @JoinTable()
  transactions: Transactions[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}