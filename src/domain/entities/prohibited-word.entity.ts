export class ProhibitedWord {
    constructor(
        public readonly id: string,
        public readonly word: string,
        public readonly category: string,
        public readonly createdAt: Date,
    ) {}

    static create(data: {
        id: string
        word: string
        category: string
        createdAt: Date
    }): ProhibitedWord {
        return new ProhibitedWord(
            data.id,
            data.word,
            data.category,
            data.createdAt,
        )
    }
}
