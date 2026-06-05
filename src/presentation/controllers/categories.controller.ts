import { Controller, Get } from '@nestjs/common';
import { ListCategoriesUseCase } from '../../application/use-cases/categories/list-categories.use-case';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) {}

  @Get()
  async findAll() {
    // Llama al caso de uso puro de la capa de aplicación
    return this.listCategoriesUseCase.execute();
  }
}