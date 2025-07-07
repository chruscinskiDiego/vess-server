import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class sampleLayerDto {

    @ApiProperty({example: 10})
    @IsNotEmpty()
    @IsNumber()
    length: number;

    @ApiProperty({example: 20})
    @IsNotEmpty()
    @IsNumber()
    note: number;

    @IsNotEmpty()
    @IsNumber()
    fk_id_sample: number;
}
