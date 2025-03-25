import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/users.schema';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description?: string;

  @Field()
  image?: string;

  @Field()
  instagram?: string;

  @Field()
  createdAt: string;
}
