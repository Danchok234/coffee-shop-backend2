import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService, SortType } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query('sortType') sortType?: SortType, @Query("searchTerm") searchTerm?:string) {
    return this.productsService.findAll(sortType, searchTerm);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productsService.findById(+id);
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Get('/relatives/:id')
  findRelatives(@Param('id') id: string) {
    return this.productsService.findRelatives(+id);
  }

  // @Get()
  // findBySearchTerm(@Query('searchTerm') searchTerm?: string) {
  //   return this.productsService.findBySearchTerm(searchTerm);
  // }
}
