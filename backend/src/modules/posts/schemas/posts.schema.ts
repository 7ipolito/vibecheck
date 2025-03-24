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
  additionalImages?: string;

  @Field()
  instagram?: string;

  // @Field({ defaultValue: 0 })
  // countLikes: number;

  // @Field({ defaultValue: 0 })
  // countComments: number;

  @Field()
  createdAt: string;

  @Field(() => User)
  user: User;

  // @Field(() => [User], { nullable: true })
  // likes: User[];

  // @Field(() => [Comment], { nullable: true })
  // comments: Comment[];
}
