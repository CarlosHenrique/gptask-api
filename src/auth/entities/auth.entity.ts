import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token!: string;
}

@InputType()
export class LoginUserInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
