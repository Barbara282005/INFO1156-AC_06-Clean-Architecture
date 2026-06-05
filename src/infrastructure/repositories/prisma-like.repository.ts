import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ILikeRepository } from '../../domain/repositories/like.repository.interface';

@Injectable()
export class PrismaLikeRepository implements ILikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async toggleLike(postId: string, userId: string) {
    const existing = await this.prisma.like.findUnique({
      where: { userId_postId: { userId, postId } }
    });
    if (existing) {
      await this.prisma.like.delete({ where: { userId_postId: { userId, postId } } });
      return { liked: false };
    }
    await this.prisma.like.create({ data: { postId, userId } });
    return { liked: true };
  }
}