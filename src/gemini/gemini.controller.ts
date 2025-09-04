import { Controller, Post, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { GeminiService } from './gemini.service';
import { PromptDto } from './Dtos/PromptDto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('image')
  async getImage(@Body() body: PromptDto, @Res() res: Response) {
    try {
      const buffer = await this.geminiService.generateImage(body.prompt);

      res.setHeader('Content-Type', 'image/png');
      res.send(buffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
