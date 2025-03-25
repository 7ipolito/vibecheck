import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './entities/ticket.entity';
import { TicketsResolver } from './ticket.resolver';
import { TicketsService } from './tickets.service';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    PostsModule, // Importa o PostsModule para acessar o PostService ou PostResolver
  ],
  exports: [MongooseModule],
  providers: [TicketsResolver, TicketsService],
})
export class TicketsModule {}
