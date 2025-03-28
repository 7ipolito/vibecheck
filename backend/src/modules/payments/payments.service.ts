import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Payment,
  PaymentDocument,
  PaymentStatus,
} from './entities/payment.entity';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { User, UserDocument } from '../users/entities/user.entity';
import { TicketsService } from '../ticket/tickets.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private readonly ticketsService: TicketsService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { userId, ticketId, ...rest } = createPaymentDto;

    // Verificar se o usuário existe
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se o ticket existe
    const ticket = await this.ticketsService.findById(ticketId);
    if (!ticket) {
      throw new NotFoundException('Ticket não encontrado');
    }

    const payment = new this.paymentModel({
      user: userId,
      ticket: ticketId,
      ...rest,
      status: PaymentStatus.PENDING,
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

  async findPaymentsByUser(walletAddress: string): Promise<Payment[]> {
    const user = await this.userModel.findOne({ walletAddress: walletAddress });

    if (!user) {
      return [];
    }

    const payments = await this.paymentModel
      .find({ user: user._id })
      .populate({
        path: 'ticket',
        populate: {
          path: 'event',
        },
      })
      .sort({ createdAt: -1 });

    return payments;
  }
}
