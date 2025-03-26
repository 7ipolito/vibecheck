import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Payment,
  PaymentDocument,
  PaymentMethod,
  PaymentStatus,
} from './entities/payment.entity';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { TicketsService } from '../ticket/tickets.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private ticketsService: TicketsService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    // Verificar se o ticket existe e pertence ao evento
    const ticket = await this.ticketsService.findById(
      createPaymentDto.ticketId,
    );

    if (!ticket || !ticket.event) {
      throw new NotFoundException('Ticket não encontrado para este evento');
    }

    const payment = new this.paymentModel({
      ticket: ticket._id,
      amount: createPaymentDto.amount,
      status: PaymentStatus.PENDING,
      method: PaymentMethod.PIX,
    });

    return payment.save();
  }

  async findPaymentById(id: string): Promise<Payment> {
    try {
      const payment = await this.paymentModel
        .findById(id)
        .populate({
          path: 'ticket',
          populate: {
            path: 'event',
          },
        })
        .exec();

      if (!payment) {
        throw new NotFoundException('Payment not found');
      }

      return payment;
    } catch (error) {
      console.error('Error finding payment:', error);
      throw new NotFoundException('Payment not found or invalid ID');
    }
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().populate('ticket').exec();
  }

  async findOne(id: string): Promise<Payment> {
    return this.paymentModel.findById(id).populate('ticket').exec();
  }

  async updatePaymentStatus(
    id: string,
    status: PaymentStatus,
  ): Promise<Payment> {
    return this.paymentModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate('ticket')
      .exec();
  }
}
