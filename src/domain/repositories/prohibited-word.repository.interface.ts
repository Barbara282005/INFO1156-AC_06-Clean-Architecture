export interface IProhibitedWordRepository {
  findAllWords(): Promise<string[]>;
  addWord(word: string): Promise<any>;
}