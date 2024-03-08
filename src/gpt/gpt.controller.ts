import { Body, Controller, Post } from '@nestjs/common';

import { GptService } from './gpt.service';
import { OrthographyDTO, ProsConsDiscusserDTO } from './dtos';

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
}
