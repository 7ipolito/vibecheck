import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entities/post.entity';
import { PostResolver } from './posts.resolver';
import { PostService } from './posts.service';
import { UsersModule } from '../users/users.module';
import { TicketsModule } from '../ticket/ticket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UsersModule,
    forwardRef(() => TicketsModule), // Usando forwardRef para evitar circularidade
  ],
  providers: [PostResolver, PostService],
  exports: [PostService, MongooseModule],
})
export class PostsModule {}
