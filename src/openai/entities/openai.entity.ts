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

  @Field()
  owner!: string;
}

export const mockCompletion = {
  role: 'assistant',
  content:
    'Aqui está um exemplo de bloco de código que contém os cards gerados para o projeto GPTask:\n' +
    '\n' +
    '```\n' +
    'const cards = [\n' +
    '  {\n' +
    '    "title": "Integração com ChatGPT",\n' +
    `    "description": "Realizar a integração do aplicativo web com o ChatGPT para que a IA possa gerar as tasks. O vídeo 'Integrating ChatGPT with a Web Application' disponível em: https://www.youtube.com/watch?v=1234567890 pode ser utilizado como orientação.",\n` +
    '    "storyPoints": 5,\n' +
    '    "acceptanceCriteria": "Ter o aplicativo web conectado ao ChatGPT e ser capaz de receber as tasks geradas pela IA",\n' +
    '    "dueDate": "03/08/2023",\n' +
    '    "label": "backlog"\n' +
    '  },\n' +
    '  {\n' +
    '    "title": "Criação de Boards",\n' +
    `    "description": "Implementar a funcionalidade de criação de boards no aplicativo web, permitindo que os usuários criem novos projetos Scrum. A documentação 'Creating Boards in GPTask' disponível em: https://gptaskdocs.com/creating-boards pode ser consultada para entender os requisitos e detalhes necessários.",\n` +
    '    "storyPoints": 8,\n' +
    '    "acceptanceCriteria": "Usuários devem ser capazes de criar boards e adicionar diferentes colunas para gerenciar suas tasks",\n' +
    '    "dueDate": "03/08/2023",\n' +
    '    "label": "backlog"\n' +
    '  },\n' +
    '  {\n' +
    '    "title": "Integração com IA",\n' +
    `    "description": "Realizar a integração do aplicativo web com a IA responsável pela geração das tasks. Será necessário utilizar APIs e bibliotecas específicas para enviar as solicitações e receber as respostas da IA. A documentação 'Integration with AI in GPTask' disponível em: https://gptaskdocs.com/integration-ai pode ser consultada para obter mais informações.",\n` +
    '    "storyPoints": 13,\n' +
    '    "acceptanceCriteria": "Aplicativo web deve ser capaz de se comunicar com a IA e receber as tasks geradas",\n' +
    '    "dueDate": "03/08/2023",\n' +
    '    "label": "backlog"\n' +
    '  },\n' +
    '  {\n' +
    '    "title": "Implementação do Backlog",\n' +
    `    "description": "Criar a funcionalidade de gerenciamento do backlog no aplicativo web, permitindo que os usuários visualizem, adicionem e removam tasks do backlog. A documentação 'Managing Backlog in GPTask' disponível em: https://gptaskdocs.com/managing-backlog pode ser consultada para entender os requisitos e detalhes necessários.",\n` +
    '    "storyPoints": 5,\n' +
    '    "acceptanceCriteria": "Usuários devem ser capazes de visualizar, adicionar e remover tasks do backlog",\n' +
    '    "dueDate": "03/08/2023",\n' +
    '    "label": "backlog"\n' +
    '  },\n' +
    '  {\n' +
    '    "title": "Implementação do Kanban",\n' +
    `    "description": "Desenvolver a funcionalidade de visualização e movimentação das tasks através das colunas do Kanban, incluindo a atualização do status de cada task. A documentação 'Implementing Kanban in GPTask' disponível em: https://gptaskdocs.com/implementing-kanban pode ser consultada para mais informações sobre os requisitos e detalhes necessários.",\n` +
    '    "storyPoints": 8,\n' +
    '    "acceptanceCriteria": "Usuários devem ser capazes de visualizar e mover as tasks entre as colunas do Kanban, atualizando seu status",\n' +
    '    "dueDate": "03/08/2023",\n' +
    '    "label": "backlog"\n' +
    '  },\n' +
    '];\n' +
    '\n' +
    'console.log(cards);\n' +
    '```\n' +
    '\n' +
    'Esse código gera um array de cards contendo todas as tarefas necessárias para o projeto GPTask. Os cards são definidos com base na descrição fornecida por Roger, incluindo títulos, descrições, story points, c',
};
