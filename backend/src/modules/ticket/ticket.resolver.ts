import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create.ticket.dto';
import { Ticket } from './schemas/ticket.schema';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  @Query(() => [Ticket], { name: 'tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Mutation(() => Ticket)
  async createTicket(
    @Args('createTicketInput') createTicketDTO: CreateTicketDto,
  ) {
    return this.ticketsService.createTicket(createTicketDTO);
  }
}
