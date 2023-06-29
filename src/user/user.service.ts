import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserInput } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async getAllUsers(): Promise<User[]> {
    const found = await this.userModel.find();
    const users: User[] = found.map((user) => {
      return user.toObject<User>();
    });
    return users;
  }

  public async findOneByEmail(email: string): Promise<User> {
    const found = await this.userModel.findOne({ email });

    return found;
  }

  public async createUser(data: UserInput): Promise<User> {
    const found = await this.userModel.create(data);
    return found.toObject<User>();
  }
}
