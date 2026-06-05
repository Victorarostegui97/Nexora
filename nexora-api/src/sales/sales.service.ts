import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Sale } from './entities/sale.entity';

import { Product } from '../products/entities/product.entity';

import { Inventory } from '../inventory/entities/inventory.entity';

import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {

  constructor(

    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>

  ) {}

  async create(
    createSaleDto: CreateSaleDto
  ) {

    const producto =
      await this.productRepository.findOne({

        where: {
          id: createSaleDto.productId
        }

      });

    if (!producto) {

      throw new Error(
        'Producto no encontrado'
      );

    }

    if (
      producto.stock <
      createSaleDto.cantidad
    ) {

      throw new Error(
        'Stock insuficiente'
      );

    }

    const total =
      Number(producto.precio) *
      createSaleDto.cantidad;

    const venta =
      this.salesRepository.create({

        producto,

        cantidad:
          createSaleDto.cantidad,

        precioUnitario:
          Number(producto.precio),

        total,

        fecha: new Date()

      });

    producto.stock -=
      createSaleDto.cantidad;

    await this.productRepository.save(
      producto
    );

    const movimiento =
      this.inventoryRepository.create({

        producto,

        tipo: 'Salida',

        cantidad:
          createSaleDto.cantidad,

        fecha: new Date()

      });

    await this.inventoryRepository.save(
      movimiento
    );

    return this.salesRepository.save(
      venta
    );

  }

  findAll() {

    return this.salesRepository.find({

      relations: ['producto'],

      order: {
        fecha: 'DESC'
      }

    });

  }

  async cancelSale(id: number) {

    const venta =
      await this.salesRepository.findOne({

        where: { id },

        relations: ['producto']

      });

    if (!venta) {

      throw new Error(
        'Venta no encontrada'
      );

    }

    if (
      venta.estado === 'Anulada'
    ) {

      throw new Error(
        'La venta ya fue anulada'
      );

    }

    venta.estado = 'Anulada';

    venta.producto.stock +=
      venta.cantidad;

    await this.productRepository.save(
      venta.producto
    );

    const movimiento =
      this.inventoryRepository.create({

        producto: venta.producto,

        tipo: 'Entrada',

        cantidad: venta.cantidad,

        fecha: new Date()

      });

    await this.inventoryRepository.save(
      movimiento
    );

    await this.salesRepository.save(
      venta
    );

    return venta;

  }

}