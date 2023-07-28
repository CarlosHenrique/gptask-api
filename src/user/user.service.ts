import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, CreateUserInput } from './entities/user.entity';
import { OpenAiService } from 'src/openai/openai.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly openaiService: OpenAiService,
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

  public async createUser(data: CreateUserInput): Promise<User> {
    const createdUser = await this.userModel.create(data);
    const answer = await this.openaiService.getBoardBasedOnQuestions({
      projectName: 'JS ASSINCRONO',
      duration: '2 meses',
      daysForWork: ['Segunda', 'Terça', 'Quarta'],
      people: 1,
      description: 'O projeto será criado para aprender js assincrono',
    });
    console.log(answer);
    return createdUser.toObject<User>();
  }
}
