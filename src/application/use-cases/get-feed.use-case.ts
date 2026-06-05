import { Inject, Injectable } from "@nestjs/common"
import {
    FeedPost,
    IPostRepository,
    POST_REPOSITORY,
} from "@/domain/repositories/post.repository.interface"
import { FeedRankingStrategyFactory } from "@/posts/feed-ranking.strategy"

@Injectable()
export class GetFeedUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
        private readonly feedRankingFactory: FeedRankingStrategyFactory,
    ) {}

    async execute(mode: string, categoryId?: string): Promise<FeedPost[]> {
        const feedPosts = await this.postRepository.getFeedPosts(categoryId)
        return this.feedRankingFactory.forMode(mode).rank(feedPosts)
    }
}
