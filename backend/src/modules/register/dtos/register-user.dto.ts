import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IError } from 'src/types/IError';

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  walletAddress: string;
}
@ObjectType()
export class ErrorType implements IError {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class RegisterResponse {
  @Field(() => [ErrorType], { nullable: true })
  error?: ErrorType[];

  @Field(() => Boolean, { nullable: true })
  success?: boolean;
}
