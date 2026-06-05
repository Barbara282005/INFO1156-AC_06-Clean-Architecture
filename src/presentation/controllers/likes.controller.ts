import { Controller, Post, Param, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ToggleLikeUseCase } from '../../application/use-cases/likes/toggle-like.use-case';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'; // Ajustar ruta según el proyecto original

@Controller('posts/:postId/likes')
export class LikesController {
  constructor(private readonly toggleLikeUseCase: ToggleLikeUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async toggleLike(@Param('postId') postId: string, @Request() req) {
    // Extrae el ID del usuario autenticado desde el Request del JWT
    const userId = req.user.id;
    
    // Ejecuta el caso de uso desacoplado de la capa de aplicación
    return this.toggleLikeUseCase.execute(postId, userId);
  }
}