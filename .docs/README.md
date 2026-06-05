# Refactorización: Clean Architecture

---

## Problemas identificados

### Problema 1 — Ausencia del Repository Pattern

Todos los `Service` accedían directamente a `PrismaService`, acoplando la lógica de negocio al ORM concreto. Cualquier cambio de base de datos requería modificar los services.

```typescript
// ANTES — PostsService acoplado directamente a Prisma
@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePostDto) {
        const moderation = await this.moderationService.moderate(text)
        return await this.prisma.post.create({ data }) // depende del ORM
    }
}
```

**Consecuencia:** si se cambia SQLite por PostgreSQL o Prisma por TypeORM, hay que modificar cada service.

---

### Problema 2 — DTOs en el módulo incorrecto

`CreateCommentDto` y `AddLikeDto` estaban definidos en `src/posts/posts.dtos.ts`, pero los usaban `CommentsController`, `CommentsService`, `LikesController` y `LikesService`. Esto obligaba a módulos ajenos a depender del módulo `posts` solo para obtener sus tipos de entrada.

```typescript
// ANTES — CommentsService importa desde el módulo posts
import { CreateCommentDto } from "@/posts/posts.dtos"
```

---

### Problema 3 — Ausencia de Use Cases

Los `Service` mezclaban tres responsabilidades distintas en un mismo método:

- **Orquestación:** verificar que el post exista antes de comentar
- **Lógica de negocio:** moderar el contenido con palabras prohibidas
- **Acceso a datos:** llamadas directas a Prisma

Clean Architecture separa estas responsabilidades en una capa de **Application** con Use Cases explícitos, cada uno con una única responsabilidad.

---

### Problema 4 — Sin interfaces ni contratos

No existía ninguna interfaz para repositorios ni servicios. El código dependía siempre de clases concretas, haciendo imposible inyectar dobles de prueba sin levantar la base de datos real.

---

### Problema 5 — Entidades de dominio = modelos de Prisma

Los tipos generados automáticamente por Prisma se usaban como entidades de negocio. Esto acopla el dominio a la capa de persistencia: si cambia el schema de Prisma, cambian las entidades de negocio.

---

### Problema 6 — Dependencias cruzadas entre módulos

`CommentsModule` y `LikesModule` importaban `PostsModule` completo solo para verificar la existencia de un post, creando acoplamiento horizontal innecesario entre módulos.

```typescript
// ANTES — CommentsModule depende de PostsModule
@Module({
    imports: [PostsModule], // solo para verificar que el post existe
})
export class CommentsModule {}
```

---

## Solución aplicada

Se implementó **Clean Architecture** con cuatro capas explícitas siguiendo la **Regla de Dependencia**: las capas externas dependen de las internas, nunca al revés.

```
Domain ← Application ← Infrastructure
                     ← Presentation (Controllers)
```

### Capa 1 — Domain

Contiene las entidades de negocio puras y las interfaces de repositorios. No tiene ninguna dependencia externa (ni NestJS, ni Prisma).

```typescript
// DESPUÉS — Entidad de dominio pura, sin dependencias
export class Post {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly imageUrl: string,
        public readonly categoryId: string | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(data: { ... }): Post { ... }
}
```

```typescript
// DESPUÉS — Interfaz de repositorio con token de inyección
export const POST_REPOSITORY = Symbol("IPostRepository")

export interface IPostRepository {
    create(data: CreatePostData): Promise<Post>
    findAll(): Promise<Post[]>
    findById(id: string): Promise<Post | null>
    getFeedPosts(categoryId?: string): Promise<FeedPost[]>
}
```

### Capa 2 — Application

Contiene los Use Cases. Cada uno orquesta el flujo de una operación usando las interfaces del dominio, sin conocer la implementación concreta.

```typescript
// DESPUÉS — CreatePostUseCase: orquesta moderación + persistencia
@Injectable()
export class CreatePostUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: IPostRepository,
        private readonly moderateContent: ModerateContentUseCase,
    ) {}

    async execute(data: CreatePostDto): Promise<Post> {
        const moderation = await this.moderateContent.execute(
            `${data.title} ${data.description}`
        )
        if (!moderation.approved) {
            throw new BadRequestException(moderation.reason)
        }
        return this.postRepository.create(data)
    }
}
```

### Capa 3 — Infrastructure

Contiene las implementaciones concretas de los repositorios usando Prisma. Es la única capa que conoce el ORM.

```typescript
// DESPUÉS — PrismaPostRepository implementa IPostRepository
@Injectable()
export class PrismaPostRepository implements IPostRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreatePostData): Promise<Post> {
        const record = await this.prisma.post.create({ data })
        return Post.create(record) // convierte modelo Prisma → entidad dominio
    }
}
```

### Capa 4 — Presentation

Los controllers ahora dependen de Use Cases, no de Services directamente.

```typescript
// DESPUÉS — PostsController usa use cases
@Controller("api/posts")
export class PostsController {
    constructor(
        private readonly createPost: CreatePostUseCase,
        private readonly getAllPosts: GetAllPostsUseCase,
        private readonly getFeed: GetFeedUseCase,
    ) {}
}
```


## Estructura de carpetas

```
src/
├── domain/                               # Capa 1: sin dependencias externas
│   ├── entities/
│   │   ├── post.entity.ts
│   │   ├── comment.entity.ts
│   │   ├── like.entity.ts
│   │   ├── category.entity.ts
│   │   └── prohibited-word.entity.ts
│   ├── repositories/                     # Interfaces (contratos)
│   │   ├── post.repository.interface.ts
│   │   ├── comment.repository.interface.ts
│   │   ├── like.repository.interface.ts
│   │   ├── category.repository.interface.ts
│   │   └── moderation.repository.interface.ts
│   ├── value-objects/
│   │   └── moderation-result.vo.ts
│   └── index.ts
│
├── application/                          # Capa 2: use cases
│   └── use-cases/
│       ├── create-post.use-case.ts
│       ├── get-all-posts.use-case.ts
│       ├── get-feed.use-case.ts
│       ├── create-comment.use-case.ts
│       ├── list-comments-by-post.use-case.ts
│       ├── add-like.use-case.ts
│       ├── moderate-content.use-case.ts
│       ├── get-all-categories.use-case.ts
│       └── index.ts
│
├── infrastructure/                       # Capa 3: implementaciones Prisma
│   └── repositories/
│       ├── prisma-post.repository.ts
│       ├── prisma-comment.repository.ts
│       ├── prisma-like.repository.ts
│       ├── prisma-category.repository.ts
│       ├── prisma-moderation.repository.ts
│       └── index.ts
│
├── posts/                                # Capa 4: presentación
│   ├── dtos/posts.dtos.ts
│   ├── posts.controller.ts
│   ├── posts.module.ts
│   └── feed-ranking.strategy.ts         # sin cambios (Strategy pattern correcto)
├── comments/
│   ├── dtos/create-comment.dto.ts       # movido desde posts
│   ├── comments.controller.ts
│   └── comments.module.ts
├── likes/
│   ├── dtos/add-like.dto.ts             # movido desde posts
│   ├── likes.controller.ts
│   └── likes.module.ts
├── categories/
│   ├── categories.controller.ts
│   └── categories.module.ts
├── moderation/
│   ├── moderation.controller.ts
│   ├── moderation.service.ts
│   ├── moderation.module.ts
│   └── moderation.dtos.ts
└── shared/
    ├── prisma.service.ts
    └── prisma.module.ts
```

---