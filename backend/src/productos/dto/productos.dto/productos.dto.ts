import { IsString } from "class-validator";

export class ProductosDto {
    @IsString({ message: 'Esto no es un string' })
    category: string;
    @IsString({ message: 'Esto no es un string' })
    img: string;
    @IsString({ message: 'Esto no es un string' })
    color: string[];
    @IsString({ message: 'Esto no es un string' })
    talla: TallaDto[];
}

export class TallaDto {
    @IsString({ message: 'Esto no es un string' })
    nombre: string;
    @IsString({ message: 'Esto no es un string' })
    stock: number;
}
