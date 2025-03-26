import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { Payment } from './schemas/payment.schema';
import { PaymentStatus } from './entities/payment.entity';
import { CreatePaymentDto } from './dtos/create-payment.dto';

@Resolver(() => Payment)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Query(() => [Payment])
  async payments() {
    return this.paymentsService.findAll();
  }

  // @Query(() => Payment)
  // async payment(@Args('id') id: string) {
  //   return this.paymentsService.findOne(id);
  // }

  @Mutation(() => Payment)
  async createPayment(@Args('input') createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.createPayment(createPaymentDto);
  }

  @Mutation(() => Payment)
  async updatePaymentStatus(
    @Args('id') id: string,
    @Args('status') status: PaymentStatus,
  ) {
    return this.paymentsService.updatePaymentStatus(id, status);
  }

  @Query(() => Payment, { name: 'payment' })
  async getPayment(@Args('id', { type: () => String }) id: string) {
    return this.paymentsService.findPaymentById(id);
  }
}
