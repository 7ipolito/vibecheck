import { InputType, Field } from '@nestjs/graphql';

@InputType() // Adicionando o decorador InputType
export class CreateTicketDto {
  @Field()
  eventId: string;

  @Field()
  type: string;

  @Field()
  price: number;

  @Field({ nullable: true }) // Marque como nullable se o campo for opcional
  bucketUrl?: string;
}
