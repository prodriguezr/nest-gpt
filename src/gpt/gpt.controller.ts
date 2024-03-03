import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDTO } from './dtos/orthography.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() payload: OrthographyDTO) {
    return this.gptService.orthographyCheck(payload);
  }
}
