import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openAI: OpenAI,
  options: Options,
) => {
  const { prompt: content } = options;

  const completion = await openAI.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          Te serán proveídos textos en español con posibles errores ortográficos y gramaticales.
          Las palabras obligatoriamente deben existir el el Diccionario de la Real Academia Española de la lengua.
          Debes responder en formato JSON, tu tarea es corregirlos y mostrar posibles soluciones, también debes de dar un porcentaje de acierto por el usuario.
          Si no hay errores, debes mostrar un mensaje de felicitaciones.

          Ejemplo de salida:

          {
            userScore: number,
            error: string[], // ['error -> solución']
            message: string, // Usa emojis y texto para felicitar al usuario 
          }
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

  console.log({ completion });

  const response = JSON.parse(completion.choices[0].message.content);

  return response;
};
