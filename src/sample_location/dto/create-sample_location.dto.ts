import { IsNotEmpty, IsNumber } from "class-validator";

export class sampleLocationDto {

    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;

    @IsNotEmpty()
    @IsNumber()
    fk_id_sample: number;
}
