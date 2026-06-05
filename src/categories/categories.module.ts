import { Module } from "@nestjs/common"
import { CategoriesController } from "@/categories/categories.controller"
import { PrismaCategoryRepository } from "@/infrastructure/repositories/prisma-category.repository"
import { CATEGORY_REPOSITORY } from "@/domain/repositories/category.repository.interface"
import { GetAllCategoriesUseCase } from "@/application/use-cases/get-all-categories.use-case"

@Module({
    controllers: [CategoriesController],
    providers: [
        { provide: CATEGORY_REPOSITORY, useClass: PrismaCategoryRepository },
        GetAllCategoriesUseCase,
    ],
})
export class CategoriesModule {}
