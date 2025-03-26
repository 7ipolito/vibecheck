import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Payment } from 'src/modules/payments/entities/payment.entity';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  // @Field(() => String)
  // @Prop()
  // email: string;

  @Field(() => String)
  @Prop()
  walletAddress: string;

  @Field(() => String)
  @Prop()
  image: string;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  username: string;

  @Field(() => [Payment], { nullable: true })
  @Prop({
    type: [{ type: MongooSchema.Types.ObjectId, ref: 'Payment' }],
    default: [],
  })
  payments: Payment[];

  @Field(() => Date)
  createdAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
