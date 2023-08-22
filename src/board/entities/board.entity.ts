import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Board {
  @Field()
  @Prop({ required: true })
  id!: string;

  @Field()
  @Prop({ required: true })
  title!: string;

  @Field()
  @Prop({ required: true })
  description!: string;

  @Field(() => [Task])
  @Prop({ required: true })
  tasks!: Task[];

  @Field()
  @Prop({ required: true })
  owner!: string;
}

@ObjectType()
export class Task {
  @Field()
  id!: string;

  @Field()
  @Prop({ required: true })
  title!: string;

  @Field()
  @Prop({ required: true })
  description!: string;

  @Field()
  @Prop({ required: true })
  storyPoints!: number;

  @Field()
  @Prop({ required: true })
  acceptanceCriteria!: string;

  @Field(() => Date)
  @Prop({ required: true })
  dueDate!: Date;

  @Field()
  @Prop({ required: true })
  label!: string;
}

@InputType()
export class CreateBoardInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => [CreateTaskInput])
  tasks!: CreateTaskInput[];

  @Field()
  owner!: string;
}

@InputType()
export class CreateTaskInput {
  @Field()
  id!: string;
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  storyPoints!: number;

  @Field()
  acceptanceCriteria!: string;

  @Field(() => Date)
  dueDate!: Date;

  @Field()
  label!: string;
}

@InputType()
export class OwnerBoardInput {
  @Field()
  owner!: string;
}

export type BoardDocument = HydratedDocument<Board>;
export const BoardSchema = SchemaFactory.createForClass(Board);
