import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICommentRepository } from '../../domain/repositories/comment.repository.interface';
import { Comment } from '../../domain/entities/comment.entity';

@Injectable()
export class PrismaCommentRepository implements ICommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { content: string; postId: string; authorId: string }): Promise<Comment> {
    const record = await this.prisma.comment.create({ data });
    return new Comment(record.id, record.content, record.postId, record.authorId, record.createdAt);
  }

  async findByPostId(postId: string): Promise<Comment[]> {
    const records = await this.prisma.comment.findMany({ where: { postId } });
    return records.map(r => new Comment(r.id, r.content, r.postId, r.authorId, r.createdAt));
  }
}