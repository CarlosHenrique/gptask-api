import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { UseGuards } from '@nestjs/common/decorators';
import {
  Board,
  OwnerBoardInput,
  UpdateTaskLabelInput,
} from './entities/board.entity';
import { BoardQuestionInput } from 'src/openai/entities/openai.entity';
import { JwtAuthGuard } from 'src/auth/gql.auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board])
  async getAllBoardsFromUser(
    @Args({ name: 'input', type: () => OwnerBoardInput })
    data: OwnerBoardInput,
  ): Promise<Board[]> {
    return this.boardService.findBoardsByEmail(data);
  }

  @Query(() => Board)
  async getBoardById(
    @Args({ name: 'input', type: () => String })
    id: string,
  ): Promise<Board> {
    return this.boardService.findBoardById(id);
  }

  @Mutation(() => Board)
  async createBoard(
    @Args({ name: 'input', type: () => BoardQuestionInput })
    data: BoardQuestionInput,
  ): Promise<Board> {
    return this.boardService.createBoard(data);
  }

  @Mutation(() => Board)
  async updateLabelBasedOnTaskId(
    @Args({ name: 'input', type: () => UpdateTaskLabelInput })
    data: UpdateTaskLabelInput,
  ): Promise<Board> {
    return this.boardService.updateLabelBasedOnTaskId(data);
  }
}
