import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create.ticket.dto';
import { Ticket } from './schemas/ticket.schema';
import { FindTicketDTo } from './dtos/find.ticket.dto';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  @Query(() => [Ticket], { name: 'tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Query(() => [Ticket], { name: 'tickets' })
  findByEventId(@Args('findTicketInput') findTicketDTO: FindTicketDTo) {
    return this.ticketsService.findByPostId(findTicketDTO.eventId);
  }

  @Query(() => Ticket, { name: 'ticket' })
  findById(@Args('id') id: string) {
    return this.ticketsService.findById(id);
  }

  @Mutation(() => Ticket)
  async createTicket(
    @Args('createTicketInput') createTicketDTO: CreateTicketDto,
  ) {
    return this.ticketsService.createTicket(createTicketDTO);
  }
}
