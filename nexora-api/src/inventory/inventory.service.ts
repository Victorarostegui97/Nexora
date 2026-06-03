import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Inventory } from './entities/inventory.entity';

import { Product } from '../products/entities/product.entity';

@Injectable()
export class InventoryService {

  constructor(

    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>

  ) {}

  async create(data: any) {

    const producto = await this.productRepository.findOne({
      where: {
        id: data.productId
      }
    });

    if (!producto) {
      throw new Error(
        'Producto no encontrado'
      );
    }

    const movimiento =
      this.inventoryRepository.create({

        producto,

        tipo: data.tipo,

        cantidad: data.cantidad,

        fecha: new Date()

      });

    if (data.tipo === 'Entrada') {

      producto.stock += data.cantidad;

    }

    if (data.tipo === 'Salida') {

      producto.stock -= data.cantidad;

    }

    await this.productRepository.save(
      producto
    );

    return this.inventoryRepository.save(
      movimiento
    );

  }

  findAll() {

    return this.inventoryRepository.find({
      relations: ['producto'],
      order: {
        fecha: 'DESC'
      }
    });

  }

}