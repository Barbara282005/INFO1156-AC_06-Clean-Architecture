import { Module } from "@nestjs/common"
import { CommentsController } from "@/comments/comments.controller"
import { PrismaCommentRepository } from "@/infrastructure/repositories/prisma-comment.repository"
import { PrismaPostRepository } from "@/infrastructure/repositories/prisma-post.repository"
import { COMMENT_REPOSITORY } from "@/domain/repositories/comment.repository.interface"
import { POST_REPOSITORY } from "@/domain/repositories/post.repository.interface"
import { CreateCommentUseCase } from "@/application/use-cases/create-comment.use-case"
import { ListCommentsByPostUseCase } from "@/application/use-cases/list-comments-by-post.use-case"
import { ModerationModule } from "@/moderation/moderation.module"

@Module({
    imports: [ModerationModule],
    controllers: [CommentsController],
    providers: [
        { provide: COMMENT_REPOSITORY, useClass: PrismaCommentRepository },
        { provide: POST_REPOSITORY, useClass: PrismaPostRepository },
        CreateCommentUseCase,
        ListCommentsByPostUseCase,
    ],
})
export class CommentsModule {}
