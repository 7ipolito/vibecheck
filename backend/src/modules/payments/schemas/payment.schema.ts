import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Ticket } from 'src/modules/ticket/schemas/ticket.schema';

@ObjectType()
export class Payment {
  @Field(() => ID, { name: 'id' })
  _id: string;

  @Field(() => Ticket)
  ticket: Ticket;

  @Field({ nullable: true })
  method: string;

  @Field(() => Number)
  amount: number;

  @Field()
  status: string;

  @Field({ nullable: true })
  transactionId?: string;

  @Field({ nullable: true })
  pixCopiaECola?: string;

  @Field({ nullable: true })
  pixQrCodeUrl?: string;

  @Field({ nullable: true })
  worldcoinVerificationId?: string;

  @Field({ nullable: true })
  worldcoinNullifier?: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
