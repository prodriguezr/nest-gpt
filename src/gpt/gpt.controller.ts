import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

import { GptService } from './gpt.service';
import { OrthographyDTO, ProsConsDiscusserDTO } from './dtos';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() payload: OrthographyDTO) {
    return this.gptService.orthographyCheck(payload);
  }

  @Post('pros-cons-discusser')
  prosConsDiscusser(@Body() payload: ProsConsDiscusserDTO) {
    return this.gptService.prosConsDiscusser(payload);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDiscusserStream(
    @Body() payload: ProsConsDiscusserDTO,
    @Res() response: Response,
  ) {
    const stream = await this.gptService.prosConsDiscusserStream(payload);

    response.setHeader('Content-Type', 'application/json');
    response.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';

      response.write(piece);
    }

    response.end();
  }
}
