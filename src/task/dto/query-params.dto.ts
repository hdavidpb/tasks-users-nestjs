import { IsOptional, IsString } from "class-validator";

export class QueryParamsTaskDto {


    @IsString()
    @IsOptional()
    status?:string

    @IsString()
    @IsOptional()
    query?:string

    @IsString()
    @IsOptional()
    tag?:string

}