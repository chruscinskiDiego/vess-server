import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { sampleLayerDto } from "src/sample_layers/dto/create-sample_layer.dto";
import { sampleLocationDto } from "src/sample_location/dto/create-sample_location.dto";

export class sampleAvaliationDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    num_layers: number;

    @IsNotEmpty()
    @IsString()
    file_link: string;

    @IsNotEmpty()
    @IsNumber()
    score: number;

    @IsNotEmpty()
    @IsNumber()
    fk_id_avaliation: number;

    @IsArray()
    sample_layers: sampleLayerDto[];

    @IsObject()
    sample_location: sampleLocationDto;

    fk_id_sample?: any;

}
