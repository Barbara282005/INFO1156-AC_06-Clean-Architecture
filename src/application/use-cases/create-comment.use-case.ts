import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import { Comment } from "@/domain/entities/comment.entity"
import {
    COMMENT_REPOSITORY,
    ICommentRepository,
} from "@/domain/repositories/comment.repository.interface"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/domain/repositories/post.repository.interface"
import { ModerateContentUseCase } from "./moderate-content.use-case"
import { CreateCommentDto } from "@/comments/dtos/create-comment.dto"

@Injectable()
export class CreateCommentUseCase {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepository: ICommentRepository,
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
        private readonly moderateContent: ModerateContentUseCase,
    ) {}

    async execute(postId: string, data: CreateCommentDto): Promise<Comment> {
        const post = await this.postRepository.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }

        const moderation = await this.moderateContent.execute(data.content)
        if (!moderation.approved) {
            throw new BadRequestException(
                moderation.reason ?? "Comentario bloqueado por moderación",
            )
        }

        return this.commentRepository.create({
            postId,
            content: data.content,
            source: "comments-module",
        })
    }
}
