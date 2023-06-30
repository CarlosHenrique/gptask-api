/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, LoginUserInput } from './entities/auth.entity';
import { User, CreateUserInput } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args({ name: 'input', type: () => LoginUserInput })
    loginUserInput: LoginUserInput,
  ): Promise<string> {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => User)
  async signUp(
    @Args({ name: 'input', type: () => CreateUserInput })
    createUserInput: CreateUserInput,
  ) {
    const userExists = await this.userService.findOneByEmail(
      createUserInput.email,
    );
    if (userExists) throw new Error('User already exists!');
    const password = await bcrypt.hash(createUserInput.password, 10);
    return this.userService.createUser({ ...createUserInput, password });
  }
}
