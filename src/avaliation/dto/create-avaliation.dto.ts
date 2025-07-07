import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { sampleAvaliationDto } from "src/sample_avaliation/dto/create-sample_avaliation.dto";


@ApiExtraModels(sampleAvaliationDto)
export class CreateAvaliationDto {

    @ApiProperty({example: 'descrição...'})
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({example: 'decisão...'})
    @IsNotEmpty()
    @IsString()
    management_decision: string;

    @ApiProperty({example: 'resumo...'})
    @IsOptional()
    @IsString()
    summary: string;

    @ApiProperty({example: 'informações...'})
    @IsNotEmpty()
    @IsString()
    infos: string;

    @ApiProperty({example: 10})
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsEmpty()
    file_link: string;

    @Type(() => sampleAvaliationDto)
    @ApiProperty({
        type: sampleAvaliationDto,
        isArray: true,
    })
    @IsArray()
    sample_avaliation: sampleAvaliationDto[];
}
