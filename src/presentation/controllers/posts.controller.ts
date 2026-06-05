import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { CreatePostUseCase } from '../../application/use-cases/posts/create-post.use-case';
import { GetFeedUseCase } from '../../application/use-cases/posts/get-feed.use-case';
import { CreatePostDto } from '../dtos/create-post.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'; // Ajustar ruta original

@Controller('posts')
export class PostsController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getFeedUseCase: GetFeedUseCase
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePostDto, @Request() req) {
    return this.createPostUseCase.execute({
      ...dto,
      authorId: req.user.id,
    });
  }

  @Get('feed')
  async getFeed() {
    return this.getFeedUseCase.execute();
  }
}