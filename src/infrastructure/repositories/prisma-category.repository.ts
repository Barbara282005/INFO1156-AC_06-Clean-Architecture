import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ICategoryRepository } from '../../domain/repositories/category.repository.interface';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.category.findMany();
  }
}