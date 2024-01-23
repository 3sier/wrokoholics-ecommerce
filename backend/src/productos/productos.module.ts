import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Productos, ProductosSchema } from './productos.schema';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Productos.name,
            schema: ProductosSchema,
        },
    ]),
    ],
    controllers: [ProductosController],
    providers: [ProductosService]
})
export class ProductosModule { }