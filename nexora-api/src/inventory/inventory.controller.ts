import {
  Controller,
  Post,
  Body,
  Get
} from '@nestjs/common';

import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {

  constructor(
    private inventoryService: InventoryService
  ) {}

  @Post()

  create(
    @Body()
    body: any
  ) {

    return this.inventoryService.create(
      body
    );

  }

  @Get()

  findAll() {

    return this.inventoryService.findAll();

  }

}