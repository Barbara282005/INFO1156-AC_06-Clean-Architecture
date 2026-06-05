import { Post } from '../entities/post.entity';

export interface IPostRepository {
  create(postData: { title: string; content: string; authorId: string; categoryId: string }): Promise<Post>;
  findById(id: string): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  getFeedEntries(): Promise<any[]>; // Trae los posts con conteos de likes y comentarios para el algoritmo
}