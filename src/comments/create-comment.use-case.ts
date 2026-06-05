import { ICommentRepository } from '../../../domain/repositories/comment.repository.interface';
import { IProhibitedWordRepository } from '../../../domain/repositories/prohibited-word.repository.interface';

export class InappropriateContentException extends Error {
  constructor() {
    super('El comentario contiene palabras prohibidas inapropiadas.');
  }
}

export class CreateCommentUseCase {
  constructor(
    private readonly commentRepository: ICommentRepository,
    private readonly prohibitedWordRepository: IProhibitedWordRepository
  ) {}

  async execute(dto: { content: string; postId: string; authorId: string }) {
    const prohibitedWords = await this.prohibitedWordRepository.findAllWords();
    
    // Regla de negocio crítica: Moderación Automática
    const containsProhibited = prohibitedWords.some(word => 
      dto.content.toLowerCase().includes(word.toLowerCase())
    );

    if (containsProhibited) {
      throw new InappropriateContentException();
    }

    return this.commentRepository.create(dto);
  }
}