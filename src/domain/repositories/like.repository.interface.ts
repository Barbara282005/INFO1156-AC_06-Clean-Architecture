import { Like } from "@/domain/entities/like.entity"

export const LIKE_REPOSITORY = Symbol("ILikeRepository")

export type CreateLikeData = {
    postId: string
    reactionType: string
    weight: number
    source: string
}

export interface ILikeRepository {
    create(data: CreateLikeData): Promise<Like>
}
