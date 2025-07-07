import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';
import { AiHelperDto } from './dto/ai-helper.dto';

@Controller('ai-helper')
export class OpenAiController {

  constructor(private readonly openAiService: OpenAiService) {}

  @Post()
  @HttpCode(200)
  async useHelper (@Body() body: AiHelperDto) {

    const {prompt} = body;

    return await this.openAiService.useHelper(prompt);

  }

}
