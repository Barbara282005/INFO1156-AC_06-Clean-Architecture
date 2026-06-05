import { IProhibitedWordRepository } from '../../../domain/repositories/prohibited-word.repository.interface';

export class ManageProhibitedWordsUseCase {
  constructor(private readonly wordRepository: IProhibitedWordRepository) {}

  async addWord(word: string) {
    if (!word || word.trim() === '') throw new Error('Palabra inválida');
    return this.wordRepository.addWord(word.trim());
  }

  async listWords() {
    return this.wordRepository.findAllWords();
  }
}