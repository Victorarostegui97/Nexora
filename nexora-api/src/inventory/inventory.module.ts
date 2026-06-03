import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Inventory } from './entities/inventory.entity';

import { Product } from '../products/entities/product.entity';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService],
  imports: [
  TypeOrmModule.forFeature([
    Inventory,
    Product
  ])
]
})
export class InventoryModule {}
