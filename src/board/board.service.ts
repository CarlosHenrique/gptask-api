import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/openai/openai.service';
import {
  Board,
  BoardDocument,
  OwnerBoardInput,
  UpdateTaskOnBoardInput,
} from './entities/board.entity';
import { Model } from 'mongoose';
import { BoardQuestionInput } from 'src/openai/entities/openai.entity';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BoardService {
  constructor(
    private readonly openAiService: OpenAiService,
    @InjectModel(Board.name)
    private readonly boardModel: Model<BoardDocument>,
  ) {}

  async createBoard(boardQuestions: BoardQuestionInput): Promise<Board> {
    const tasks = await this.openAiService.getBoardBasedOnQuestions(
      boardQuestions,
    );
    const board: Board = {
      id: uuidv4(),
      tasks,
      title: boardQuestions.projectName,
      description: boardQuestions.description,
      owner: boardQuestions.owner,
    };
    const created = await this.boardModel.create(board);
    return created.toObject<Board>();
  }

  async findBoardsByEmail(data: OwnerBoardInput): Promise<Board[]> {
    const found = await this.boardModel.find(data);
    const boards = found.map((board) => board.toObject<Board>());
    console.log(boards);
    return boards;
  }

  async findBoardById(id: string): Promise<Board> {
    const found = await this.boardModel.findById(id);

    return found.toObject<Board>();
  }

  // criar uma mutation para trocar o status da task baseado na ID
  async updateTaskFieldsBasedOnBoardId(
    data: UpdateTaskOnBoardInput,
  ): Promise<Board> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = data.value;
    if (data.field === 'dueDate') value = new Date(value);
    if (data.field === 'storyPoints') value = parseInt(value);
    await this.boardModel.updateOne(
      {
        id: data.boardId,
        'tasks.id': data.taskId,
      },
      {
        $set: { [`tasks.$.${data.field}`]: value },
      },
      { new: true },
    );
    const updatedBoard = await this.boardModel.findOne({ id: data.boardId });
    return updatedBoard.toObject<Board>();
  }
}
