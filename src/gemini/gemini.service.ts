import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });
  }

  async generateImage(prompt: string): Promise<Buffer> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: prompt,
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('Nenhuma resposta de candidato retornada pelo Gemini.');
    }

    const parts = response.candidates[0].content?.parts;
    const part = parts?.find((p: any) => p.inlineData);

    if (!part?.inlineData?.data) {
      throw new Error('Nenhuma imagem encontrada na resposta do Gemini.');
    }

    const imageData: string = part.inlineData.data;
    return Buffer.from(imageData, 'base64');
  }
}
