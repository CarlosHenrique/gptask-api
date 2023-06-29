/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, LoginUserInput } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === password) {
      // make more security above
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput): Promise<any> {
    const user = await this.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
