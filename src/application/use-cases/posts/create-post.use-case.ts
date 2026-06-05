import { IPostRepository } from '../../../domain/repositories/post.repository.interface';
import { Post } from '../../../domain/entities/post.entity';

export class CreatePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(dto: { title: string; content: string; authorId: string; categoryId: string }): Promise<Post> {
    if (!dto.title || dto.title.trim() === '') {
      throw new Error('El título no puede estar vacío');
    }
    return this.postRepository.create(dto);
  }
}