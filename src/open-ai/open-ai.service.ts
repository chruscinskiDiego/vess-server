import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAiService {

    constructor(private readonly httpService: HttpService) { }

    async useHelper(prompt: string) {

        try {
            const response = await this.httpService.post('/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 150,
            }).toPromise();

            const message: string =  response?.data.choices[0].message.content.trim();

            return {
                message: JSON.stringify(message)
            }

        } catch (err: any) {
            console.error('Erro ao chamar OpenAI', err.response?.data || err.message);
            throw err;
        }

    }
}
