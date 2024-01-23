import { IsString, IsArray } from 'class-validator';
import { ordersDto } from './orders.dto';

export class UsersDto {
  @IsString({ message: 'Esto no es un name' })
  name: string;
  @IsString({ message: 'Esto no es un lastname' })
  lastname: string;
  @IsString({ message: 'Esto no es un email' })
  email: string;
  @IsString({ message: 'Esto no es un username' })
  username: string;
  @IsString({ message: 'Esto no es un password' })
  password: string;
  @IsArray({ message: 'No es pedido valido' })
  orders: Array<ordersDto>;
}
