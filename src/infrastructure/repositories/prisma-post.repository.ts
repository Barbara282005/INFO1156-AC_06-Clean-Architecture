import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajustar ruta según proyecto original
import { IPostRepository } from '../../domain/repositories/post.repository.interface';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class PrismaPostRepository implements IPostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { title: string; content: string; authorId: string; categoryId: string }): Promise<Post> {
    const created = await this.prisma.post.create({ data });
    return new Post(created.id, created.title, created.content, created.authorId, created.categoryId, created.createdAt);
  }

  async findById(id: string): Promise<Post | null> {
    const record = await this.prisma.post.findUnique({ where: { id } });
    if (!record) return null;
    return new Post(record.id, record.title, record.content, record.authorId, record.categoryId, record.createdAt);
  }

  async findAll(): Promise<Post[]> {
    const records = await this.prisma.post.findMany();
    return records.map(r => new Post(r.id, r.title, r.content, r.authorId, r.categoryId, r.createdAt));
  }

  async getFeedEntries(): Promise<any[]> {
    return this.prisma.post.findMany({
      include: {
        author: true,
        category: true,
        _count: {
          select: { likes: true, comments: true }
        }
      }
    });
  }
}