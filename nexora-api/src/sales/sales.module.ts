import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesService } from './sales.service';

import { SalesController } from './sales.controller';

import { Sale } from './entities/sale.entity';

import { Product } from '../products/entities/product.entity';

import { Inventory } from '../inventory/entities/inventory.entity';

@Module({

  imports: [

    TypeOrmModule.forFeature([
      Sale,
      Product,
      Inventory
    ])

  ],

  controllers: [SalesController],

  providers: [SalesService],

})
export class SalesModule {}