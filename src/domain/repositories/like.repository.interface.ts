export interface ILikeRepository {
  toggleLike(postId: string, userId: string): Promise<{ liked: boolean }>;
}