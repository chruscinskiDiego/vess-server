import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserConfigDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsNotEmpty()
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
