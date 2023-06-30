import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
