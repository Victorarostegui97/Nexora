import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column('decimal')
  precio!: number;

  @Column()
  stock!: number;

  @Column()
  categoria!: string;
}
