/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import {
  OpenAIApi,
  Configuration,
  CreateChatCompletionResponseChoicesInner,
  ChatCompletionResponseMessage,
} from 'openai';
import { BoardQuestionInput, OpenAiOptions } from './entities/openai.entity';
import { mockCompletion } from './entities/openai.entity';

@Injectable()
export class OpenAiService {
  private openAiApi: OpenAIApi;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async connect(config: OpenAiOptions) {
    return (this.openAiApi = new OpenAIApi(new Configuration(config)));
  }

  formatCompletion(data: any): any {
    const startIdx = data.content.indexOf('const cards = [');
    const endIdx = data.content.indexOf('];', startIdx);

    if (startIdx === -1 || endIdx === -1) {
      throw new Error('Array de cards não encontrado.');
    }

    const cardsString = data.content.substring(startIdx + 14, endIdx + 1);

    let cardsArray;

    try {
      console.log(cardsString);
      cardsArray = eval(cardsString);
    } catch (error) {
      throw new Error('Erro ao avaliar o código JavaScript.');
    }
    return cardsArray;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  createPrompt(text: BoardQuestionInput | string) {
    if (typeof text === 'string') {
      return;
    }
    const prompt = `Você é um product owner de uma renomada empresa, sabendo isso, Roger, que está tentando criar um projeto baseado na metodologia SCRUM, solicita sua ajuda na divisão e definição de tarefas do projeto que ele está iniciando. O projeto se chamará ${text.projectName} e irá durar ${text.duration} iniciando a partir de hoje sendo o limite de tempo, Roger irá se dedicar ao projeto nos dias  ${text.daysForWork},${text.people} pessoas irá/irão participar do projeto. Quando você solicitou uma descrição breve sobre o projeto de Roger, ele respondeu: ${text.description}, com base nisso você pode detalhar tudo que será necessário para que roger conclua seu objetivo em cards que possam ser utilizados na metodologia descrita e todos deverão ser iniciados no backlog? A saida deverá ser em formato json contendo os seguintes campos:  titulo, descrição, story points(baseados na sequencia de Fibonacci), criterio de aceitação(baseado na descrição do card), data de vencimento (pegar o duração definida acima e usar a data de hoje), label (as labels disponiveis são [in-progress, backlog, done, selected-for-development]), as descrições devem conter referências a documentação ou links de videos para que roger possa compreender melhor o assunto e ter um norte para o seu desenvolvimento,por um exemplo um card pode ser parecido com isso:

    {
      "titulo": "Aprender sobre Callbacks",
      "descricao": "Estudar callbacks, uma técnica fundamental para trabalhar com funções assíncronas em JavaScript. Recomenda-se o vídeo 'JavaScript Callbacks Explained!' disponível em: https://www.youtube.com/watch?v=QRq2zMHlBz4",
      "story_points": 1,
      "criterio_aceitacao": "Entender como utilizar callbacks para realizar operações assíncronas",
      "due_date": "03/08/2023",
      "label": "backlog"
    },
    {
      "titulo": "Aprender sobre Async/Await",
      "descricao": "Estudar a sintaxe e a utilização do recurso Async/Await do JavaScript permitindo escrever código assíncrono de forma síncrona. Para auxiliar, sugere-se ler a documentação oficial disponível em: https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await",
      "story_points": 3,
      "criterio_aceitacao": "Ser capaz de utilizar o Async/Await para simplificar a escrita de código assíncrono",
      "due_date": "03/08/2023",
      "label": "backlog"
    }
    
    me retorne um bloco de código com um array que contém os cards gerados, lembre-se que estou usando javascript, segue um exemplo de reposta: 
    const cards = [
      {
        "titulo": "Aprender sobre Promises",
        "descricao": "Estudar o conceito de Promises no JavaScript. Pode-se utilizar o artigo 'Understanding Promises in JavaScript' como referência: https://scotch.io/tutorials/javascript-promises-for-dummies",
        "story_points": 2,
        "criterio_aceitacao": "Ser capaz de criar e utilizar Promises para realizar tarefas assíncronas",
        "due_date": "03/08/2023",
        "label": "backlog"
      },
      {
        "titulo": "Aprender sobre Callbacks",
        "descricao": "Estudar callbacks, uma técnica fundamental para trabalhar com funções assíncronas em JavaScript. Recomenda-se o vídeo 'JavaScript Callbacks Explained!' disponível em: https://www.youtube.com/watch?v=QRq2zMHlBz4",
        "story_points": 1,
        "criterio_aceitacao": "Entender como utilizar callbacks para realizar operações assíncronas",
        "due_date": "03/08/2023",
        "label": "backlog"
      },]
    `;

    return prompt;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getBoardBasedOnQuestions(question: BoardQuestionInput) {
    try {
      // const completion = await this.openAiApi.createChatCompletion({
      //   model: 'gpt-3.5-turbo',
      //   messages: [{ role: 'user', content: this.createPrompt(question) }],
      // });
      // console.log(completion.data.choices[0].message);
      const cardsArray = this.formatCompletion(mockCompletion);

      return cardsArray;
    } catch (error) {
      //   console.error(error);
      throw new Error(error);
    }
  }
}
