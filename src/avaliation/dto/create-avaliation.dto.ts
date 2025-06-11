import { IsArray, IsDate, IsDateString, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { sampleAvaliationDto } from "src/sample_avaliation/dto/create-sample_avaliation.dto";

export class CreateAvaliationDto {

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    management_decision: string;

    @IsNotEmpty()
    @IsString()
    summary: string;

    @IsNotEmpty()
    @IsString()
    infos: string;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsEmpty()
    file_link: string;

    @IsDateString()
    created_at?: Date;

    @IsArray()
    sample_avaliation: sampleAvaliationDto[];
}
