import { Module } from "@nestjs/common"
import { LikesController } from "@/likes/likes.controller"
import { PrismaLikeRepository } from "@/infrastructure/repositories/prisma-like.repository"
import { PrismaPostRepository } from "@/infrastructure/repositories/prisma-post.repository"
import { LIKE_REPOSITORY } from "@/domain/repositories/like.repository.interface"
import { POST_REPOSITORY } from "@/domain/repositories/post.repository.interface"
import { AddLikeUseCase } from "@/application/use-cases/add-like.use-case"

@Module({
    controllers: [LikesController],
    providers: [
        { provide: LIKE_REPOSITORY, useClass: PrismaLikeRepository },
        { provide: POST_REPOSITORY, useClass: PrismaPostRepository },
        AddLikeUseCase,
    ],
})
export class LikesModule {}
