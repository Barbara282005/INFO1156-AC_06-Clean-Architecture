import { Injectable } from "@nestjs/common"
import { Category } from "@/domain/entities/category.entity"
import { ICategoryRepository } from "@/domain/repositories/category.repository.interface"
import { PrismaService } from "@/shared/prisma.service"

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Category[]> {
        const records = await this.prisma.category.findMany({
            orderBy: { name: "asc" },
        })
        return records.map((r) => Category.create(r))
    }
}
