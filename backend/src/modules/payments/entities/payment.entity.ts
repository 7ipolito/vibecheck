import { Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';

export enum PaymentMethod {
  PIX = 'pix',
  WORLDCOIN = 'worldcoin',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

@Schema({ timestamps: true })
export class Payment extends Document {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Ticket)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ticket', required: true })
  ticket: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  method?: PaymentMethod;

  @Field(() => Number)
  @Prop({ required: true })
  amount: number;

  @Field(() => String)
  @Prop({ required: true, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Field(() => String, { nullable: true })
  @Prop()
  transactionId?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  pixCopiaECola?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  pixQrCodeUrl?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  worldcoinVerificationId?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  worldcoinNullifier?: string;

  @Field(() => Date)
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field(() => Date)
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type PaymentDocument = Payment & Document;

export const PaymentSchema = SchemaFactory.createForClass(Payment);
