import { IsNumber, IsString } from 'class-validator';

export class pedidosDto {
    @IsString({ message: 'Esto no es un id' })
    id: string;
    @IsString({ message: 'Esto no es una cantidad' })
    cantidad: string;
    @IsString({ message: 'Esto no es un precio' })
    precio: string;
    @IsString({ message: 'Esto no es un precio' })
    image: string;
}
