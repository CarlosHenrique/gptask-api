import { Field, InputType } from '@nestjs/graphql';

export type OpenAiOptions = {
  apiKey: string;
};

@InputType()
export class BoardQuestionInput {
  @Field()
  projectName!: string;

  @Field()
  duration!: string;

  @Field()
  daysForWork!: number;

  @Field()
  people!: number;

  @Field()
  description!: string;
}

export const mockCompletion = {
  role: 'assistant',
  content:
    'Claro! Segue abaixo o código que irá gerar um array com os cards para o projeto "JS ASSINCRONO":\n' +
    '\n' +
    '```javascript\n' +
    'const cards = [\n' +
    '  {\n' +
    '    "titulo": "Aprender sobre Promises",\n' +
    `    "descricao": "Estudar o conceito de Promises no JavaScript. Pode-se utilizar o artigo 'Understanding Promises in JavaScript' como referência: https://scotch.io/tutorials/javascript-promises-for-dummies",\n` +
    '    "story_points": 2,\n' +
    '    "criterio_aceitacao": "Ser capaz de criar e utilizar Promises para realizar tarefas assíncronas",\n' +
    '    "due_date": new Date().toLocaleDateString(),\n' +
    '    "label": "backlog"\n' +
    '  },\n' +
    '  {\n' +
    '    "titulo": "Aprender sobre Callbacks",\n' +
    `    "descricao": "Estudar callbacks, uma técnica fundamental para trabalhar com funções assíncronas em JavaScript. Recomenda-se o vídeo 'JavaScript Callbacks Explained!' disponível em: https://www.youtube.com/watch?v=QRq2zMHlBz4",\n` +
    '    "story_points": 1,\n' +
    '    "criterio_aceitacao": "Entender como utilizar callbacks para realizar operações assíncronas",\n' +
    '    "due_date": new Date().toLocaleDateString(),\n' +
    '    "label": "backlog"\n' +
    '  },\n' +
    '  {\n' +
    '    "titulo": "Aprender sobre Async/Await",\n' +
    '    "descricao": "Estudar a sintaxe e a utilização do recurso Async/Await do JavaScript permitindo escrever código assíncrono de forma síncrona. Para auxiliar, sugere-se ler a documentação oficial disponível em: https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Async_await",\n' +
    '    "story_points": 3,\n' +
    '    "criterio_aceitacao": "Ser capaz de utilizar o Async/Await para simplificar a escrita de código assíncrono",\n' +
    '    "due_date": new Date().toLocaleDateString(),\n' +
    '    "label": "backlog"\n' +
    '  },\n' +
    '  {\n' +
    '    "titulo": "Projeto Prático: Consumir uma API Assíncrona",\n' +
    `    "descricao": "Criar um projeto prático onde será necessário utilizar técnicas assíncronas para consumir uma API. Pode-se utilizar a API 'JSONPlaceholder' para realizar as requisições assíncronas: https://jsonplaceholder.typicode.com/",\n` +
    '    "story_points": 5,\n' +
    '    "criterio_aceitacao": "Obter sucesso ao consumir e exibir os dados da API de forma assíncrona",\n' +
    '    "due_date": new Date().toLocaleDateString(),\n' +
    '    "label": "backlog"\n' +
    '  }\n' +
    '];\n' +
    '\n' +
    'console.log(JSON.stringify(cards, null, 2));\n' +
    '```\n' +
    '\n' +
    'Esse código irá gerar um array chamado "cards" com os cards detalhados para o projeto "JS ASSINCRONO". É importante lembrar de verificar as referências fornecidas nos campos "descricao" para uma melhor compreensão e orientação do Roger durante o desenvolvimento das tarefas.\n' +
    '\n' +
    'Cada card contém os campos solicitados: "titulo", "descricao", "story_points", "criterio_aceitacao", "due_date" e "label". O "due_date" é definido como a data de hoje.',
};
