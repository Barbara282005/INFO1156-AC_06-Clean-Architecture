import { Comment } from "@/domain/entities/comment.entity"

export const COMMENT_REPOSITORY = Symbol("ICommentRepository")

export type CreateCommentData = {
    postId: string
    content: string
    source: string
}

export type CommentListResult = {
    total_comments: number
    comments: Comment[]
}

export interface ICommentRepository {
    create(data: CreateCommentData): Promise<Comment>
    findByPostId(postId: string): Promise<Comment[]>
}
