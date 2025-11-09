import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { CreatePromptDto } from './dto/create-prompt.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}



  @Post('generate-description')
    generateDescription(@Body() body:CreatePromptDto) {

      return this.geminiService.getTaskByGemini(body.prompt)

    }


}
