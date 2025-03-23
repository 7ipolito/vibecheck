import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';

import { CreateFullyPostDto } from './dtos/create-post-fully.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  // async createSimplePost(createPostDto: CreateSimplePostDto): Promise<Post> {
  //   const { name } = createPostDto;

  //   // const user = await this.userModel.findOne({ clerkUserId });
  //   // if (!user) {
  //   //   throw new NotFoundException('User not found');
  //   // }

  //   const createdPost = await this.postModel.create({
  //     body,
  //     user: user._id,
  //   });

  //   return this.postModel.findById(createdPost._id).populate('user');
  // }

  async createFullyPost(createPostDto: CreateFullyPostDto) {
    // const { name, image, description } = createPostDto;

    // const user = await this.userModel.findOne({ clerkUserId });
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }

    // const createdPost = await this.postModel.create({
    //   body,
    //   user: user._id,
    // });

    // return this.postModel.findById(createdPost._id).populate('user');

    return true;
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find();
  }
}
