import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Product } from '../products/entities/product.entity';

import { Inventory } from '../inventory/entities/inventory.entity';

@Injectable()
export class DashboardService {

  constructor(

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>

  ) {}

  async getSummary() {

    const totalProductos =
      await this.productRepository.count();

    const productos =
      await this.productRepository.find();

    const stockTotal =
      productos.reduce(
        (acc, p) => acc + Number(p.stock),
        0
      );

    const entradas =
      await this.inventoryRepository.count({
        where: {
          tipo: 'Entrada'
        }
      });

    const salidas =
      await this.inventoryRepository.count({
        where: {
          tipo: 'Salida'
        }
      });

    return {

      totalProductos,

      stockTotal,

      entradas,

      salidas

    };

  }

  async getLowStockProducts() { 
    return this.productRepository.createQueryBuilder('product')
    .where('product.stock <= :stock', { stock: 19 })
    .orderBy( 'product.stock', 'ASC' )
    .getMany(); 
  }

  async getRecentMovements() {

    return this.inventoryRepository.find({

      relations: ['producto'],

      order: {
        fecha: 'DESC'
      },

      take: 5

    });

  }

}