import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { Board, OwnerBoardInput } from './entities/board.entity';
import { BoardQuestionInput } from 'src/openai/entities/openai.entity';

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

  @Mutation(() => Board)
  async createBoard(
    @Args({ name: 'input', type: () => BoardQuestionInput })
    data: BoardQuestionInput,
  ): Promise<Board> {
    console.log(data);

    return this.boardService.createBoard(data);
  }
}
