import { Field, InputType } from '@nestjs/graphql';
import { PaymentMethod } from '../entities/payment.entity';

@InputType()
export class CreatePaymentDto {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  ticketId: string;

  @Field(() => String)
  method: PaymentMethod;

  @Field(() => Number)
  amount: number;

  // Campos opcionais específicos do WorldCoin
  @Field(() => String, { nullable: true })
  worldcoinVerificationId?: string;

  @Field(() => String, { nullable: true })
  worldcoinNullifier?: string;
}

@InputType()
export class CreatePaymentInitialDto {
  @Field(() => String)
  ticketId: string;

  @Field(() => String)
  method: PaymentMethod;
}
