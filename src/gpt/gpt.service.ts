import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDTO } from './dtos';

@Injectable()
export class GptService {
  private openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Only call use cases
  async orthographyCheck({ prompt }: OrthographyDTO) {
    return await orthographyCheckUseCase(this.openAI, { prompt });
  }
}
