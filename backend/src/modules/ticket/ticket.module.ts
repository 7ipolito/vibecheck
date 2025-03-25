import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './entities/ticket.entity';
import { TicketsResolver } from './ticket.resolver';
import { TicketsService } from './tickets.service';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    forwardRef(() => PostsModule), // Usando forwardRef
  ],
  providers: [TicketsResolver, TicketsService],
  exports: [TicketsService, MongooseModule], // Exportando o serviço
})
export class TicketsModule {}
