import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Ticket, TicketDocument } from './entities/ticket.entity';
import { CreateTicketDto } from './dtos/create.ticket.dto';
import { Post, PostDocument } from '../posts/entities/post.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().populate('event');
  }

  async findById(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).populate('event');

    if (!ticket) {
      throw new NotFoundException('Ticket não encontrado');
    }

    return ticket;
  }

  async findByPostId(id: string): Promise<Ticket[]> {
    return this.ticketModel.find({ event: id }).populate('event');
  }

  async createTicket(createTicketDTO: CreateTicketDto): Promise<Ticket> {
    const { eventId, ...ticketData } = createTicketDTO;

    const event = await this.postModel.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    const ticket = new this.ticketModel({
      ...ticketData,
      event: eventId,
    });

    const savedTicket = await ticket.save();
    return savedTicket.populate('event');
  }
}
