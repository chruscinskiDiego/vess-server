import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class LoginLogs extends Document {

    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    userName: string;

    @Prop({required: true})
    userEmail: string;

    @Prop({required: true})
    loginDate: Date;

}

export const LoginSchema = SchemaFactory.createForClass(LoginLogs);