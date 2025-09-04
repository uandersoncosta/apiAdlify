import { ApiProperty } from '@nestjs/swagger';

export class PromptDto {
    @ApiProperty({
        description: 'Texto usado como prompt para gerar a imagem',
        example: 'Um gato astronauta em Marte',
    })
    prompt: string;
}
