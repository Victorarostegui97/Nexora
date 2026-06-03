import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {

    return this.productsService.remove(+id);

  }

  @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() body: any
    ) {

    return this.productsService.update(
      +id,
      body
    );

}

}