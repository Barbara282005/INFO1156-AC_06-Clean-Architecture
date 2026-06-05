import { IPostRepository } from '../../../domain/repositories/post.repository.interface';

export class GetFeedUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute() {
    const entries = await this.postRepository.getFeedEntries();

    // Aquí se traslada la regla del negocio del archivo feed-ranking.strategy.ts
    return entries
      .map((post) => {
        const hoursSinceCreation = (Date.now() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60);
        const likes = post._count?.likes || 0;
        const comments = post._count?.comments || 0;
        
        // Algoritmo de ranking (regla de negocio pura)
        const score = (likes * 2 + comments * 5) / Math.pow(hoursSinceCreation + 2, 1.5);
        
        return {
          ...post,
          score,
        };
      })
      .sort((a, b) => b.score - a.score);
  }
}