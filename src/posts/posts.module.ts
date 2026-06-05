import { Module } from "@nestjs/common"
import { FeedRankingStrategyFactory } from "@/posts/feed-ranking.strategy"
import { PostsController } from "@/posts/posts.controller"
import { PrismaPostRepository } from "@/infrastructure/repositories/prisma-post.repository"
import { POST_REPOSITORY } from "@/domain/repositories/post.repository.interface"
import { CreatePostUseCase } from "@/application/use-cases/create-post.use-case"
import { GetAllPostsUseCase } from "@/application/use-cases/get-all-posts.use-case"
import { GetFeedUseCase } from "@/application/use-cases/get-feed.use-case"
import { ModerationModule } from "@/moderation/moderation.module"

@Module({
    imports: [ModerationModule],
    controllers: [PostsController],
    providers: [
        { provide: POST_REPOSITORY, useClass: PrismaPostRepository },
        FeedRankingStrategyFactory,
        CreatePostUseCase,
        GetAllPostsUseCase,
        GetFeedUseCase,
    ],
    exports: [POST_REPOSITORY],
})
export class PostsModule {}
