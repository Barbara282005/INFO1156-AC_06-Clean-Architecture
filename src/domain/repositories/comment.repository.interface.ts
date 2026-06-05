import { Comment } from '../entities/comment.entity';

export interface ICommentRepository {
  create(data: { content: string; postId: string; authorId: string }): Promise<Comment>;
  findByPostId(postId: string): Promise<Comment[]>;
}