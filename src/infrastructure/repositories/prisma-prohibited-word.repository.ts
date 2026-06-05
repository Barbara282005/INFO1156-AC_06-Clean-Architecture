import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IProhibitedWordRepository } from '../../domain/repositories/prohibited-word.repository.interface';

@Injectable()
export class PrismaProhibitedWordRepository implements IProhibitedWordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllWords(): Promise<string[]> {
    const records = await this.prisma.prohibitedWord.findMany();
    return records.map(r => r.word);
  }

  async addWord(word: string) {
    return this.prisma.prohibitedWord.create({ data: { word } });
  }
}