import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { Post } from "@/domain/entities/post.entity"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/domain/repositories/post.repository.interface"
import { ModerateContentUseCase } from "@/application/use-cases/moderate-content.use-case"
import { CreatePostDto } from "@/posts/dtos/posts.dtos"

@Injectable()
export class CreatePostUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
        private readonly moderateContent: ModerateContentUseCase,
    ) {}

    async execute(data: CreatePostDto): Promise<Post> {
        const text = `${data.title} ${data.description}`
        const moderation = await this.moderateContent.execute(text)

        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Post bloqueado por moderación",
            )
        }

        return this.postRepository.create(data)
    }
}
