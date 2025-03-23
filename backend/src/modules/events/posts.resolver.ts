import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './posts.service';
import { Post } from './schemas/posts.schema';

import { CreateFullyPostDto } from './dtos/create-post-fully.dto';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll();
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostDto: CreateFullyPostDto) {
    return this.postService.createFullyPost(createPostDto);
  }
}
