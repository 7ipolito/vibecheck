import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreateSimplePostDto } from './dtos/create-post-simple.dto';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postService.findAll();
  }

  @Mutation(() => Post)
  async createPost(
    @Args('createPostInput') createPostDto: CreateSimplePostDto,
  ) {
    return this.postService.createSimplePost(createPostDto);
  }
}
