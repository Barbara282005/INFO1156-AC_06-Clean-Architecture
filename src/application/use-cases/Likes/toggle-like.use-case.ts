import { ILikeRepository } from '../../../domain/repositories/like.repository.interface';

export class ToggleLikeUseCase {
  constructor(private readonly likeRepository: ILikeRepository) {}

  async execute(postId: string, userId: string) {
    return this.likeRepository.toggleLike(postId, userId);
  }
}