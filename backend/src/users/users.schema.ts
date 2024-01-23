import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ordersDto } from './dto/orders.dto';

export type UsersDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  orders: Array<ordersDto>;
}

export class Orders {
  @Prop()
  producto: string;
  @Prop()
  date: string;
  @Prop()
  cantidad: string;
  @Prop()
  precio: string;
  @Prop()
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
