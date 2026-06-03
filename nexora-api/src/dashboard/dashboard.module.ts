import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';

import { DashboardService } from './dashboard.service';

import { Product } from '../products/entities/product.entity';

import { Inventory } from '../inventory/entities/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Inventory
    ])
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}