import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSimplePostDto {
  @Field()
  name: string;

  @Field()
  image: string;
}
