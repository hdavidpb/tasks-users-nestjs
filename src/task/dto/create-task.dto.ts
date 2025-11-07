import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    
        @IsString()
        @IsNotEmpty()
        title:string;
    
    

        @IsNotEmpty()
        @IsArray()
        tags:string[]
        
        @IsOptional()
        @IsString()    
        description?:string;

        @IsOptional()
        @IsMongoId()
        userId?: string;
    


}
