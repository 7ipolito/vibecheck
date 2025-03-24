import { Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';
import { User } from 'src/modules/users/users.schema';

@Schema({ timestamps: true })
export class Post extends Document {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  name: string; // Nome do Posto

  @Field({ nullable: true })
  @Prop()
  description?: string; // Descrição do evento

  @Field({ nullable: true })
  @Prop()
  image?: string; // Imagem principal do evento

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  additionalImages?: string[];

  @Field({ nullable: true })
  @Prop()
  instagram?: string;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field(() => User)
  @Prop({ type: MongooSchema.Types.ObjectId, ref: 'User', required: true })
  user: MongooSchema.Types.ObjectId;
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
