import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserInput } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'input', type: () => UserInput }) data: UserInput,
  ): Promise<User> {
    return this.userService.createUser(data);
  }
}
