import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';

import { SalesService } from './sales.service';

import { CreateSaleDto } from './dto/create-sale.dto';

@Controller('sales')
export class SalesController {

  constructor(
    private readonly salesService: SalesService
  ) {}

  @Post()
  create(
    @Body()
    createSaleDto: CreateSaleDto
  ) {

    return this.salesService.create(
      createSaleDto
    );

  }

  @Patch(':id/cancel')
  cancelSale(
    @Param('id') id: string
  ) {

    return this.salesService
      .cancelSale(+id);

  }

  @Get()
  findAll() {

    return this.salesService.findAll();

  }

}