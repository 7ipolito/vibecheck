import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { Payment, PaymentSchema } from './entities/payment.entity';
import { TicketsModule } from '../ticket/ticket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    TicketsModule,
  ],
  providers: [PaymentsService, PaymentsResolver],
  exports: [PaymentsService],
})
export class PaymentsModule {}
