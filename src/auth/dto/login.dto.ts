import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class LoginDTO {

    @ApiProperty({
        example: 'email@gmail.com',
        description: 'Informe seu e-mail'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'PWEB1020@utf',
        description: 'Informe sua senha'
    })
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    @IsNotEmpty()
    password: string;
    
}