import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '../../../modules/posts/entities/post.entity';

@ObjectType()
export class Ticket {
  @Field(() => ID)
  id: string; // ID do ticket no formato string

  @Field(() => Post) // Referência direta ao tipo Post
  event: Post; // Não usar ObjectId aqui, apenas o tipo Post

  @Field()
  type: string; // Tipo do ticket (ex: VIP, Pista)

  @Field(() => Number)
  price: number; // Preço do ticket

  @Field({ nullable: true })
  bucketUrl?: string; // URL para o bucket do ticket (opcional)

  @Field()
  status: string; // Status do ticket (ex: disponível, vendido)

  @Field()
  createdAt: string; // Data de criação do ticket (no formato ISO string)

  @Field()
  updatedAt: string; // Data de atualização do ticket (no formato ISO string)
}
