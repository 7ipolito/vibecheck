import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  username: string;

  @Field()
  walletAddress: string;

  @Field()
  image: string;

  @Field()
  createdAt: Date;
}
