import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class GeminiService {
  private geminiApiKey: string;

  private generativeIa: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(private readonly configService: ConfigService) {
    this.geminiApiKey = this.configService.get('geminiGoogleApiKey')!;

    this.generativeIa = new GoogleGenerativeAI(this.geminiApiKey);

    this.model = this.generativeIa.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });
  }

  async getTaskByGemini(prompt: string) {

    const PROMPT = `A continuación te enviare una descripción de una tarea la cual necesito que la mejores de una manera mas profesional y gramaticalmente, solo dame 1 opción: ${prompt}`;
    
    try {
      const result = await this.model.generateContent(PROMPT);
      const response = result.response;
      return {
        response: response.text(),
      };
    } catch (error) {
        console.log("ERROR: ",error)
      return new BadRequestException('Error generating content');
    }
  }
}
