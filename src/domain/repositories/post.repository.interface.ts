import { Post } from "@/domain/entities/post.entity"

export const POST_REPOSITORY = Symbol("IPostRepository")

export type CreatePostData = {
    title: string
    description: string
    imageUrl: string
    categoryId?: string | null
}

export type FeedPost = {
    id: string
    title: string
    description: string
    imageUrl: string
    categoryId: string | null
    category: string | null
    createdAt: Date
    updatedAt: Date
    likesCount: number
    commentsCount: number
    relevanceScore: number
}

export interface IPostRepository {
    create(data: CreatePostData): Promise<Post>
    findAll(): Promise<Post[]>
    findById(id: string): Promise<Post | null>
    getFeedPosts(categoryId?: string): Promise<FeedPost[]>
}
