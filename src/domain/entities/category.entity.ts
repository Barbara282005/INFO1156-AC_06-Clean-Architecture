export class Category {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly slug: string,
    ) {}

    static create(data: { id: string; name: string; slug: string }): Category {
        return new Category(data.id, data.name, data.slug)
    }
}
