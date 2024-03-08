import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { orthographyCheckUseCase, prosConsDiscusserUseCase } from './use-cases';
import { OrthographyDTO, ProsConsDiscusserDTO } from './dtos';

@Injectable()
export class GptService {
  private openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Only call use cases
  async orthographyCheck({ prompt }: OrthographyDTO) {
    return await orthographyCheckUseCase(this.openAI, { prompt });
  }

  async prosConsDiscusser({ prompt }: ProsConsDiscusserDTO) {
    return await prosConsDiscusserUseCase(this.openAI, { prompt });
  }
}
