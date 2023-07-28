import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Board {}

@ObjectType()
export class Task {}

@InputType()
export class CreateBoardInput {}

@InputType()
export class CreateTaskInput {}

export type BoardDocument = HydratedDocument<Board>;
export const BoardSchema = SchemaFactory.createForClass(Board);
