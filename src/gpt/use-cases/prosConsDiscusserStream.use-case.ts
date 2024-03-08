import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDiscusserStreamUseCase = async (
  openAI: OpenAI,
  options: Options,
) => {
  const { prompt: content } = options;

  return await openAI.chat.completions.create({
    stream: true,
    messages: [
      {
        role: 'system',
        content: `
          Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
          la respuesta debe de ser en formato markdown,
          los pros y contras deben de estar en una lista,
        `,
      },
      {
        role: 'user',
        content,
      },
    ],
    model: 'gpt-4-0613',
    max_tokens: 200,
    temperature: 0.3,
  });
};
