import {
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import { PrismaService } from "@/shared/prisma.service"
import { PostsService } from "@/posts/posts.service"

@Injectable()
export class CommentsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly postsService: PostsService,
    ) {}

    async listByPostId(postId: string) {
        await this.assertPostExists(postId)

        const comments = await this.prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        })

        return {
            total_comments: comments.length,
            comments,
        }
    }

    async create(postId: string, content: string) {
        await this.assertPostExists(postId)

        return this.prisma.comment.create({
            data: {
                postId,
                content,
                source: "comments-module",
            },
        })
    }

    private async assertPostExists(postId: string) {
        const post = await this.postsService.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }
    }
}
