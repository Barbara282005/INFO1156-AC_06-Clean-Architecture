import { Injectable, NotFoundException } from "@nestjs/common"
import { ProhibitedWord } from "@/domain/entities/prohibited-word.entity"
import { IModerationRepository } from "@/domain/repositories/moderation.repository.interface"
import { PrismaService } from "@/shared/prisma.service"

@Injectable()
export class PrismaModerationRepository implements IModerationRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<ProhibitedWord[]> {
        const records = await this.prisma.prohibitedWord.findMany({
            orderBy: { createdAt: "desc" },
        })
        return records.map((r) => ProhibitedWord.create(r))
    }

    async create(word: string, category: string): Promise<ProhibitedWord> {
        const record = await this.prisma.prohibitedWord.create({
            data: { word, category },
        })
        return ProhibitedWord.create(record)
    }

    async delete(id: string): Promise<ProhibitedWord> {
        try {
            const record = await this.prisma.prohibitedWord.delete({
                where: { id },
            })
            return ProhibitedWord.create(record)
        } catch (err: unknown) {
            if (
                err instanceof Error &&
                "code" in err &&
                (err as { code: string }).code === "P2025"
            ) {
                throw new NotFoundException("Palabra prohibida no encontrada")
            }
            throw err
        }
    }
}
