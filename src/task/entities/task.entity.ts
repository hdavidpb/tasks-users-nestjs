import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema({timestamps:true})
export class Task extends Document {


    @Prop({required:true})
    title:string;


    @Prop({required:true})
    tags:string[]
    
    @Prop()
    description?:string;

    @Prop({default:"active"})
    status?:'active' | 'archived'


    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,index:true})
    user:mongoose.Types.ObjectId

}

export const TaskSchema = SchemaFactory.createForClass(Task) 
