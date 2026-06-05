import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ManageProhibitedWordsUseCase } from '../../application/use-cases/moderation/manage-prohibited-words.use-case';
import { CreateProhibitedWordDto } from '../dtos/create-prohibited-word.dto'; // Ajustar ruta de los DTOs si aplica
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'; // Ajustar ruta según proyecto original
import { RolesGuard } from '../../auth/roles.guard'; // Si el proyecto original pide roles (ej: Admin)
import { Roles } from '../../auth/roles.decorator';

@Controller('moderation/prohibited-words')
export class ModerationController {
  constructor(private readonly manageProhibitedWordsUseCase: ManageProhibitedWordsUseCase) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN') // Asegurar el rol si el proyecto base lo exige para moderar
  @Post()
  async addWord(@Body() dto: CreateProhibitedWordDto) {
    // Ejecuta el caso de uso para guardar la palabra en la lista negra
    return this.manageProhibitedWordsUseCase.addWord(dto.word);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listWords() {
    // Ejecuta el caso de uso para listar las palabras prohibidas
    return this.manageProhibitedWordsUseCase.listWords();
  }
}