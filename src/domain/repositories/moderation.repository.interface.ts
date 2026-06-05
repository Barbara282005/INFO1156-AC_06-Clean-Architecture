import { ProhibitedWord } from "@/domain/entities/prohibited-word.entity"

export const MODERATION_REPOSITORY = Symbol("IModerationRepository")

export interface IModerationRepository {
    findAll(): Promise<ProhibitedWord[]>
    create(word: string, category: string): Promise<ProhibitedWord>
    delete(id: string): Promise<ProhibitedWord>
}
