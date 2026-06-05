import { Body, Controller, Param, Post } from "@nestjs/common"
import { AddLikeUseCase } from "@/application/use-cases/add-like.use-case"
import { AddLikeDto } from "@/likes/dtos/add-like.dto"

@Controller("api/posts/:id/likes")
export class LikesController {
    constructor(private readonly addLike: AddLikeUseCase) {}

    @Post()
    create(@Param("id") postId: string, @Body() body: AddLikeDto) {
        return this.addLike.execute(postId, body)
    }
}
