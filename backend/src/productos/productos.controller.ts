import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Productos } from './productos.schema';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) { }

  @Get()
  async getAll(@Res() res: any): Promise<Productos[]> {
    try {
      let productos = await this.productosService.getProductos();
      return await res.status(HttpStatus.OK).send(productos);
    } catch {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send('No se han encontrado productos');
    }
  }

  @Get('id/:id')
  async getProductosById(
    @Res() res: any,
    @Param('id') id: string,
  ): Promise<Productos[]> {
    try {
      let productos = await this.productosService.getProductosById(id);
      return await res.status(HttpStatus.OK).send(productos);
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send('Id not found');
    }
  }

  @Get('category/:category')
  async getProductosByCat(
    @Res() res: any,
    @Param('category') category: string,
  ): Promise<Productos[]> {
    try {
      let productos = await this.productosService.getProductosByCat(category);
      return await res.status(HttpStatus.OK).send(productos);
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send('Productos not found');
    }
  }
  @Get('/cat')
  async getCategory(@Res() res: any): Promise<Productos[]> {
    try {
      let productos = await this.productosService.getCategory();
      return await res.status(HttpStatus.OK).send(productos);
    } catch {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send('No se han encontrado productos');
    }
  }

  @Get('name/:name')
  async getProductosByName(
    @Res() res: any,
    @Param('name') name: string,
  ): Promise<Productos[]> {
    try {
      let productos = await this.productosService.getProductosByName(name);
      return await res.status(HttpStatus.OK).send(productos);
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send('Productos not found');
    }
  }

  @Get('/color/:color')
  async getProductosByColor(
    @Param('color') color: string,
    @Res() res,
  ): Promise<Productos[]> {
    try {
      let productos = await this.productosService.getProductosByColor(color);
      return await res.status(HttpStatus.OK).send(productos);
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send('Productos not found');
    }
  }

  @Get('/price/:price')
  async getProductosByPrice(
    @Param('price') price: number,
    @Res() res,
  ): Promise<Productos[]> {
    try {
      let productos = await this.productosService.getProductosByPrice(price);
      return await res.status(HttpStatus.OK).send(productos);
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send('Productos not found');
    }
  }

}
