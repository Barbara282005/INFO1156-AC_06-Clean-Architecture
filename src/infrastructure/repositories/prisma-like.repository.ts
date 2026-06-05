import { Injectable } from "@nestjs/common"
import { Like } from "@/domain/entities/like.entity"
import {
    CreateLikeData,
    ILikeRepository,
} from "@/domain/repositories/like.repository.interface"
import { PrismaService } from "@/shared/prisma.service"

@Injectable()
export class PrismaLikeRepository implements ILikeRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateLikeData): Promise<Like> {
        const record = await this.prisma.like.create({ data })
        return Like.create(record)
    }
}
