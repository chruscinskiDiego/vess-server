import { IsNotEmpty, IsNumber } from "class-validator";

export class sampleLayerDto {

    @IsNotEmpty()
    @IsNumber()
    length: number;

    @IsNotEmpty()
    @IsNumber()
    note: number;

    @IsNotEmpty()
    @IsNumber()
    fk_id_sample: number;
}
