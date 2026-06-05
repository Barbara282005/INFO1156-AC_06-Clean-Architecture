import { Inject, Injectable } from "@nestjs/common"
import { Category } from "@/domain/entities/category.entity"
import {
    CATEGORY_REPOSITORY,
    ICategoryRepository,
} from "@/domain/repositories/category.repository.interface"

@Injectable()
export class GetAllCategoriesUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: ICategoryRepository,
    ) {}

    async execute(): Promise<Category[]> {
        return this.categoryRepository.findAll()
    }
}
