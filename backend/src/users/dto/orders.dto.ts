import { IsArray, IsString } from 'class-validator';
import { pedidosDto } from './pedidos.dto';

export class ordersDto {
  @IsArray({ message: 'Esto no es un producto' })
  pedido: pedidosDto[];
  @IsString({ message: 'Esto no es un num de pedido' })
  num: string;
  @IsString({ message: 'Esto no es un date' })
  date: string;
  @IsString({ message: 'Esto no es un precio' })
  precio: string;
  @IsString({ message: 'Esto no es un status' })
  status: string;
}
