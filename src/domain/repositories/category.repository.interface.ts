export interface ICategoryRepository {
  findAll(): Promise<any[]>;
}