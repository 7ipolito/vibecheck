import { Field } from '@nestjs/graphql';

export class UpdateTicketStatusDto {
  @Field()
  ticketId: string;

  @Field()
  status: string;
}
