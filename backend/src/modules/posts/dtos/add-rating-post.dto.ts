import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddCommentInput {
  @Field(() => String)
  eventId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  rating: 1 | 2 | 3 | 4 | 5;

  @Field(() => String)
  text: string;
}
