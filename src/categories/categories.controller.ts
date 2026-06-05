import { Controller, Get } from "@nestjs/common"
import { GetAllCategoriesUseCase } from "@/application/use-cases/get-all-categories.use-case"

@Controller("api/categories")
export class CategoriesController {
    constructor(private readonly getAllCategories: GetAllCategoriesUseCase) {}

    @Get()
    findAll() {
        return this.getAllCategories.execute()
    }
}
