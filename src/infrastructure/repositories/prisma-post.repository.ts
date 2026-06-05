import { Injectable } from "@nestjs/common"
import { Post } from "@/domain/entities/post.entity"
import {
    CreatePostData,
    FeedPost,
    IPostRepository,
} from "@/domain/repositories/post.repository.interface"
import { PrismaService } from "@/shared/prisma.service"

@Injectable()
export class PrismaPostRepository implements IPostRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePostData): Promise<Post> {
        const record = await this.prisma.post.create({ data })
        return Post.create(record)
    }

    async findAll(): Promise<Post[]> {
        const records = await this.prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        })
        return records.map((r) => Post.create(r))
    }

    async findById(id: string): Promise<Post | null> {
        const record = await this.prisma.post.findUnique({ where: { id } })
        if (!record) return null
        return Post.create(record)
    }

    async getFeedPosts(categoryId?: string): Promise<FeedPost[]> {
        const posts = await this.prisma.post.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: { comments: true, likes: true, category: true },
        })

        return posts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            imageUrl: post.imageUrl,
            categoryId: post.categoryId,
            category: post.category?.name ?? null,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            likesCount: post.likes.reduce((sum, l) => sum + l.weight, 0),
            commentsCount: post.comments.length,
            relevanceScore: 0,
        }))
    }
}
