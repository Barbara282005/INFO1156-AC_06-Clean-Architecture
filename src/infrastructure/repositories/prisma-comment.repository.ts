import { Injectable } from "@nestjs/common"
import { Comment } from "@/domain/entities/comment.entity"
import {
    CreateCommentData,
    ICommentRepository,
} from "@/domain/repositories/comment.repository.interface"
import { PrismaService } from "@/shared/prisma.service"

@Injectable()
export class PrismaCommentRepository implements ICommentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateCommentData): Promise<Comment> {
        const record = await this.prisma.comment.create({ data })
        return Comment.create(record)
    }

    async findByPostId(postId: string): Promise<Comment[]> {
        const records = await this.prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        })
        return records.map((r) => Comment.create(r))
    }
}
