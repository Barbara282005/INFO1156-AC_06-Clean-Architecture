import { ICategoryRepository } from '../../../domain/repositories/category.repository.interface';

export class ListCategoriesUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute() {
    return this.categoryRepository.findAll();
  }
}