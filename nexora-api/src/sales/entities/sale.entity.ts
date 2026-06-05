import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';

@Entity()
export class Sale {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => Product
  )
  @JoinColumn()
  producto!: Product;

  @Column()
  cantidad!: number;

  @Column('decimal')
  precioUnitario!: number;

  @Column('decimal')
  total!: number;

  @Column()
  fecha!: Date;

  @Column({ default: 'Activa' })
  estado!: string;
  
}