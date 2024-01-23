import { IsString } from 'class-validator';

export class SizesDto {
  @IsString({ message: 'Esto no es un talla' })
  talla: string;
  @IsString({ message: 'Esto no es un stock' })
  stock: string;
}
