import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {


        @IsOptional()
        @IsString()
        _id:string;
    
        @IsString()
        @IsNotEmpty()
        title:string;
    
    
        @IsNotEmpty()
        @IsArray()
        tags:string[]

        @IsOptional()
        @IsString()
        status?:string;
        
        @IsOptional()
        @IsString()    
        description?:string;

        @IsOptional()
        @IsMongoId()
        userId?: string;
    
        @IsOptional()
        @IsDate()
        createdAt?:Date;

        @IsOptional()
        @IsDate()
        updatedAt?:Date;  


}
