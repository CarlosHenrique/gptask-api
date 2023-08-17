/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './entities/auth.entity';

import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const valid = await bcrypt.compare(password, user?.password);

    if (user && valid) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: LoginUserInput): Promise<any> {
    if (!this.validateUser(user.email, user.password)) {
      throw new Error('Email ou senha inválidos!');
    }
    return {
      access_token: this.jwtService.sign({
        email: user.email,
      }),
      email: user.email,
    };
  }
}
