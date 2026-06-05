import { Inject, Injectable } from "@nestjs/common"
import { ModerationResult } from "@/domain/value-objects/moderation-result.vo"
import {
    IModerationRepository,
    MODERATION_REPOSITORY,
} from "@/domain/repositories/moderation.repository.interface"

const buildFuzzyRegex = (word: string) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    return new RegExp(escaped.split("").join("[^a-zA-Z0-9]*"), "gi")
}

@Injectable()
export class ModerateContentUseCase {
    constructor(
        @Inject(MODERATION_REPOSITORY)
        private readonly moderationRepository: IModerationRepository,
    ) {}

    async execute(text: string): Promise<ModerationResult> {
        const words = await this.moderationRepository.findAll()

        for (const pw of words) {
            const regex = buildFuzzyRegex(pw.word)
            if (regex.test(text)) {
                return {
                    approved: false,
                    reason: `Contiene palabra prohibida: "${pw.word}"`,
                    category: pw.category,
                }
            }
        }

        return { approved: true }
    }
}
