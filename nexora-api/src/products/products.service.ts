import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';

import { Inventory } from '../inventory/entities/inventory.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createProductDto: any) {

    const product = this.productsRepository.create(
      createProductDto
    );

    const savedProduct =
      await this.productsRepository.save(
        createProductDto
      );

    const movimiento = this.inventoryRepository.create({

      producto: savedProduct as Product,

      tipo: 'Entrada',

      cantidad: createProductDto.stock,

      fecha: new Date()

    });

    await this.inventoryRepository.save(
      movimiento
    );

    return savedProduct;

  }

  findAll() {
    return this.productsRepository.find();
  }

  async update(
  id: number,
  updateProductDto: any
) {

  await this.productsRepository.update(
    id,
    updateProductDto
  );

  return this.productsRepository.findOne({
    where: { id }
  });

}

  async remove(id: number) {
    return this.productsRepository.delete(id);
  }

  
}
