import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { IError } from 'src/types/IError';
import { DeleteInput } from './dtos/delete-user.dto';
import { Payment } from '../payments/entities/payment.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getUser(walletAddress: string): Promise<User> {
    return await this.userModel
      .findOne({ walletAddress: walletAddress })
      .populate({
        path: 'payments',
        populate: {
          path: 'ticket',
          populate: {
            path: 'event',
          },
        },
      });
  }

  async getUserPayments(walletAddress: string): Promise<Payment[]> {
    const user = await this.userModel.findOne({ walletAddress }).populate({
      path: 'payments',
      populate: {
        path: 'ticket',
        populate: {
          path: 'event',
        },
      },
    });

    return user?.payments || [];
  }

  async deleteUser(data: DeleteInput): Promise<IError[] | null> {
    const { id } = data;
    const response = await this.userModel.findOneAndDelete({
      clerkUserId: id,
    });

    if (response) {
      return null;
    } else {
      return [
        {
          path: 'user',
          message: 'Error at delete',
        },
      ];
    }
  }
}
