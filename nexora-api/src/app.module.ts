import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { InventoryModule } from './inventory/inventory.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: 'localhost',

      port: 5432,

      username: 'postgres',

      password: 'Nexora2026',

      database: 'nexora_db',

      autoLoadEntities: true,

      synchronize: true,
    }),

    ProductsModule,

    InventoryModule,

    DashboardModule,
  ],
})
export class AppModule {}
