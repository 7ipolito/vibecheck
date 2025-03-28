import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { User } from './users.schema';
import { UserService } from './users.service';
import { DeleteInput, DeleteResponse } from './dtos/delete-user.dto';
import { WhoamiInput } from './dtos/whoami.dto';
import { Payment } from '../payments/schemas/payment.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(() => User)
  async whoami(@Args('whoamiInput') whoamiInput: WhoamiInput): Promise<User> {
    const walletAdddress = whoamiInput.walletAdddress;

    if (!walletAdddress) {
      throw new Error('User ID not found in context');
    }

    const user = await this.usersService.getUser(walletAdddress);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  @Query(() => [Payment])
  async userPayments(@Args('walletAddress') walletAddress: string) {
    return this.usersService.getUserPayments(walletAddress);
  }

  @ResolveField('payments', () => [Payment])
  async getPayments(walletAddress: string) {
    return this.usersService.getUserPayments(walletAddress);
  }

  // @Mutation(() => DeleteResponse)
  // async register(
  //   @Args('registerInput') registerInput: DeleteInput,
  // ): Promise<RegisterResponse> {
  //   const error = await this.usersService.deleteUser(registerInput.id);
  //   return { error };
  // }

  @Mutation(() => DeleteResponse)
  async deleteUser(
    @Args('deleteInput') deleteInput: DeleteInput,
  ): Promise<DeleteResponse> {
    console.log(deleteInput);
    const error = await this.usersService.deleteUser(deleteInput);
    return { error };
  }
}
