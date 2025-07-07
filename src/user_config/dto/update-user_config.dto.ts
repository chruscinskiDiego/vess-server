import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserConfigDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsOptional()
    @MinLength(3)
    @MaxLength(255)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    country: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    address: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    language: string;
}
