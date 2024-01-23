import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductosDocument = Productos & Document;

@Schema()
export class Productos {
    @Prop({ required: true })
    categoria: string;

    @Prop({ required: true })
    img: string;

    @Prop({ required: true })
    color: string;

    @Prop({ required: true })
    talla: string;

}

export const ProductosSchema = SchemaFactory.createForClass(Productos);