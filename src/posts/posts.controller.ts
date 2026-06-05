import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { CreatePostUseCase } from "@/application/use-cases/create-post.use-case"
import { GetAllPostsUseCase } from "@/application/use-cases/get-all-posts.use-case"
import { GetFeedUseCase } from "@/application/use-cases/get-feed.use-case"
import { CreatePostDto, FeedQueryDto } from "@/posts/dtos/posts.dtos"

@Controller("api/posts")
export class PostsController {
    constructor(
        private readonly createPost: CreatePostUseCase,
        private readonly getAllPosts: GetAllPostsUseCase,
        private readonly getFeed: GetFeedUseCase,
    ) {}

    @Post()
    async create(@Body() body: CreatePostDto) {
        const created = await this.createPost.execute(body)
        return {
            ok: true,
            payload: created,
        }
    }

    @Get()
    async findAll() {
        const posts = await this.getAllPosts.execute()
        return {
            total: posts.length,
            items: posts,
        }
    }

    @Get("feed")
    async feed(@Query() query: FeedQueryDto) {
        const mode = query.mode ?? "latest"
        const rows = await this.getFeed.execute(mode, query.categoryId)
        return {
            mode,
            count: rows.length,
            rows,
        }
    }
}
