import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop({ required: true })
  email!: string;

  @Field()
  @Prop({ required: true })
  psw!: string;
}

@InputType()
export class UserInput {
  @Field()
  email!: string;

  @Field()
  psw!: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
