import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common"
import { Like } from "@/domain/entities/like.entity"
import {
    ILikeRepository,
    LIKE_REPOSITORY,
} from "@/domain/repositories/like.repository.interface"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/domain/repositories/post.repository.interface"
import { AddLikeDto } from "@/likes/dtos/add-like.dto"

@Injectable()
export class AddLikeUseCase {
    constructor(
        @Inject(LIKE_REPOSITORY)
        private readonly likeRepository: ILikeRepository,
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
    ) {}

    async execute(postId: string, data: AddLikeDto): Promise<Like> {
        const post = await this.postRepository.findById(postId)
        if (!post) {
            throw new NotFoundException("Post no encontrado")
        }

        const weight = data.weight ?? 1
        if (weight < 1) {
            throw new BadRequestException("El peso debe ser al menos 1")
        }

        return this.likeRepository.create({
            postId,
            reactionType: data.reactionType ?? "like",
            weight,
            source: "likes-module",
        })
    }
}
