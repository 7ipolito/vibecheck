import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';

@ObjectType()
@Schema({ timestamps: true })
export class Post extends Document {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field({ nullable: true })
  @Prop()
  image?: string;

  @Field({ defaultValue: false })
  @Prop({ default: false })
  active?: boolean;

  @Field({ nullable: true })
  @Prop()
  instagram?: string;

  @Field()
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field(() => [String], { nullable: true })
  @Prop({
    type: [
      {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Ticket',
      },
    ],
    default: [],
  })
  tickets: Ticket[];
}

export type PostDocument = Post & Document;

export const PostSchema = SchemaFactory.createForClass(Post);
