import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AiHelperDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    prompt: string;

}