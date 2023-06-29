/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, LoginUserInput } from './entities/auth.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args({ name: 'input', type: () => LoginUserInput })
    loginUserInput: LoginUserInput,
  ): Promise<string> {
    return this.authService.login(loginUserInput);
  }
}
