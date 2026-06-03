import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';

@Entity()
export class Inventory {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => Product
  )
  @JoinColumn()
  producto!: Product;

  @Column()
  tipo!: string;

  @Column()
  cantidad!: number;

  @Column()
  fecha!: Date;

}