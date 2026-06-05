import { Inject, Injectable } from "@nestjs/common"
import { Post } from "@/domain/entities/post.entity"
import {
    IPostRepository,
    POST_REPOSITORY,
} from "@/domain/repositories/post.repository.interface"

@Injectable()
export class GetAllPostsUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
    ) {}

    async execute(): Promise<Post[]> {
        return this.postRepository.findAll()
    }
}
