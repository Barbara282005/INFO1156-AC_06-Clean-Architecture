export class Category {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly createdAt: Date,
    ) {}

    static create(data: {
        id: string
        name: string
        createdAt: Date
    }): Category {
        return new Category(data.id, data.name, data.createdAt)
    }
}
