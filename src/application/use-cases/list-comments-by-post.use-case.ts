import {
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import {
    COMMENT_REPOSITORY,
    CommentListResult,
    ICommentRepository,
} from "@/domain/repositories/comment.repository.interface"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/domain/repositories/post.repository.interface"

@Injectable()
export class ListCommentsByPostUseCase {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepository: ICommentRepository,
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
    ) {}

    async execute(postId: string): Promise<CommentListResult> {
        const post = await this.postRepository.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }

        const comments = await this.commentRepository.findByPostId(postId)
        return {
            total_comments: comments.length,
            comments,
        }
    }
}
