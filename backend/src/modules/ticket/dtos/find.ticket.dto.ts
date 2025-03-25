import { InputType, Field } from '@nestjs/graphql';

@InputType() // Adicionando o decorador InputType
export class FindTicketDTo {
  @Field()
  eventId: string;
}
