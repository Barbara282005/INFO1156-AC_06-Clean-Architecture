import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CreateCommentUseCase } from '../../application/use-cases/comments/create-comment.use-case';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly createCommentUseCase: CreateCommentUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCommentDto, @Request() req) {
    return this.createCommentUseCase.execute({
      content: dto.content,
      postId: dto.postId,
      authorId: req.user.id,
    });
  }
}