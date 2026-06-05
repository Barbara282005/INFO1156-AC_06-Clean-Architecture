export class Post {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly authorId: string,
    public readonly categoryId: string,
    public readonly createdAt: Date,
    public readonly likesCount: number = 0,
    public readonly score: number = 0
  ) {}
}