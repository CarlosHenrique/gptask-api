import { Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/openai/openai.service';

@Injectable()
export class BoardService {
  constructor(private readonly openAiService: OpenAiService) {}
}
