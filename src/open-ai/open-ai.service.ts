import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAiService {

    constructor(private readonly httpService: HttpService) { }

    async useHelper(prompt: string) {

        const finalPrompt: string = `
        
        `

        try {

            const response = await this.httpService.post('/chat/completions', {
                model: 'gpt-3.5-turbo',
                "messages": [
                    {
                        "role": "system",
                        "content": "Você é um assistente de escrita profissional, especializado em aprimorar textos: clareza, coesão, tom e correção gramatical."
                    },
                    {
                        "role": "user",
                        "content": `Por favor, analise e melhore a mensagem abaixo, mantendo o sentido original, tornando-a mais clara e polida: ${prompt}`
                    }
                ],
                "temperature": 0.7,
                "max_tokens": 300
            }).toPromise();

            const message: string = response?.data.choices[0].message.content.trim();

            return {
                message
            }

        } catch (err: any) {
            console.error('Erro ao chamar OpenAI', err.response?.data || err.message);
            throw err;
        }

    }
}
