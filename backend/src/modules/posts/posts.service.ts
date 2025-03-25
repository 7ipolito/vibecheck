import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';

import { User, UserDocument } from '../users/entities/user.entity';
import { CreateSimplePostDto } from './dtos/create-post-simple.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createSimplePost(createPostDto: CreateSimplePostDto): Promise<Post> {
    const { name, image } = createPostDto;

    const createdPost = await this.postModel.create({
      name: name,
      image: image,
    });
    return this.postModel.findById(createdPost._id);
  }

  // async createFullyPost(createPostDto: CreateFullyPostDto) {
  //   const { name, image, description, instagram, userId } = createPostDto;
  //   console.log(userId);
  //   const user = await this.userModel.findById(userId);
  //   console.log(user);

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   const createdPost = await this.postModel.create({
  //     name,
  //     image,
  //     description,
  //     instagram,
  //     user: userId,
  //   });

  //   return this.postModel.findById(createdPost._id);
  // }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find();
  }
}
