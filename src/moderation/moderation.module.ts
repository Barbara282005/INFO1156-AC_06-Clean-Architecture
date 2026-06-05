import { Module } from "@nestjs/common"
import { ModerationController } from "@/moderation/moderation.controller"
import { ModerationService } from "@/moderation/moderation.service"
import { PrismaModerationRepository } from "@/infrastructure/repositories/prisma-moderation.repository"
import { MODERATION_REPOSITORY } from "@/domain/repositories/moderation.repository.interface"
import { ModerateContentUseCase } from "@/application/use-cases/moderate-content.use-case"

@Module({
    controllers: [ModerationController],
    providers: [
        {
            provide: MODERATION_REPOSITORY,
            useClass: PrismaModerationRepository,
        },
        ModerateContentUseCase,
        ModerationService,
    ],
    exports: [ModerationService, ModerateContentUseCase, MODERATION_REPOSITORY],
})
export class ModerationModule {}
