import { Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Post } from 'src/modules/posts/schemas/posts.schema';

@Schema({ timestamps: true })
export class Ticket extends Document {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => Post)
  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'Post', required: true })
  event: MongooSchema.Types.ObjectId; // Relacionamento com Post (evento)

  @Field(() => String)
  @Prop({ required: true })
  type: string; // Tipo do ticket (ex: VIP, Pista)

  @Field(() => Number)
  @Prop({ required: true })
  price: number; // Preço do ticket

  @Field(() => String, { nullable: true })
  @Prop()
  bucketUrl?: string; // URL para o bucket do ticket

  @Field(() => String, { defaultValue: 'available' })
  @Prop({ default: 'available' })
  status: string; // Status do ticket (ex: disponível, vendido)

  @Field(() => Date)
  @Prop({ default: Date.now })
  createdAt: Date; // Data de criação

  @Field(() => Date)
  @Prop({ default: Date.now })
  updatedAt: Date; // Data de atualização
}

export type TicketDocument = Ticket & Document;

export const TicketSchema = SchemaFactory.createForClass(Ticket);
