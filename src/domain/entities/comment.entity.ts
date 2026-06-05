export class Comment {
  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly postId: string,
    public readonly authorId: string,
    public readonly createdAt: Date
  ) {}
}