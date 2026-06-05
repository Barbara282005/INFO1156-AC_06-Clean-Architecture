import { Body, Controller, Get, Param, Post } from "@nestjs/common"
import { CreateCommentUseCase } from "@/application/use-cases/create-comment.use-case"
import { ListCommentsByPostUseCase } from "@/application/use-cases/list-comments-by-post.use-case"
import { CreateCommentDto } from "@/comments/dtos/create-comment.dto"

@Controller("api/posts/:id/comments")
export class CommentsController {
    constructor(
        private readonly createComment: CreateCommentUseCase,
        private readonly listComments: ListCommentsByPostUseCase,
    ) {}

    @Get()
    list(@Param("id") postId: string) {
        return this.listComments.execute(postId)
    }

    @Post()
    create(@Param("id") postId: string, @Body() body: CreateCommentDto) {
        return this.createComment.execute(postId, body)
    }
}
