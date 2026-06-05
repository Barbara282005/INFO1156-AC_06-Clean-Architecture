import { Inject, Injectable } from "@nestjs/common"
import {
    IModerationRepository,
    MODERATION_REPOSITORY,
} from "@/domain/repositories/moderation.repository.interface"
import { ProhibitedWord } from "@/domain/entities/prohibited-word.entity"

@Injectable()
export class ModerationService {
    constructor(
        @Inject(MODERATION_REPOSITORY)
        private readonly moderationRepository: IModerationRepository,
    ) {}

    findAll(): Promise<ProhibitedWord[]> {
        return this.moderationRepository.findAll()
    }

    create(word: string, category: string): Promise<ProhibitedWord> {
        return this.moderationRepository.create(word, category)
    }

    delete(id: string): Promise<ProhibitedWord> {
        return this.moderationRepository.delete(id)
    }
}
