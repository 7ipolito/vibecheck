import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IError } from 'src/types/IError';

@InputType()
export class CreateFullyPostDto {
  @Field()
  name: string; // Nome do evento

  @Field()
  description: string; // Descrição do evento

  @Field()
  image: string; // Imagem principal do evento (URL)
}

@ObjectType()
export class ErrorTypeCreatePost implements IError {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class CreatePostResponse {
  @Field(() => [ErrorTypeCreatePost], { nullable: true })
  error?: ErrorTypeCreatePost[];

  @Field(() => Event, { nullable: true })
  event?: Event;
}
