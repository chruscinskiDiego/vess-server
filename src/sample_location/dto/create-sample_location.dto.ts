import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class sampleLocationDto {

    @ApiProperty({example: '-10101010'})
    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @ApiProperty({example: '20202020'})
    @IsNotEmpty()
    @IsNumber()
    longitude: number;

    @IsNotEmpty()
    @IsNumber()
    fk_id_sample: number;
}
