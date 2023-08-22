import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/openai/openai.service';
import {
  Board,
  BoardDocument,
  OwnerBoardInput,
  UpdateTaskLabelInput,
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
  async updateLabelBasedOnTaskId(data: UpdateTaskLabelInput): Promise<Board> {
    await this.boardModel.updateOne(
      {
        id: data.boardId,
        'tasks.id': data.taskId,
      },
      {
        $set: { 'tasks.$.label': data.label },
      },
      { new: true },
    );

    return await (
      await this.boardModel.findById({ id: data.boardId })
    ).toObject<Board>();
  }
}
