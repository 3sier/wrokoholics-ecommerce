import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get(':id')
  async getProductosById(
    @Res() res: any,
    @Param('id') userId: string,
  ): Promise<any> {
    try {
      let productos = await this.cartService.getCartById(userId);
      return await res.status(HttpStatus.OK).send(productos);
    } catch {
      return res.status(HttpStatus.NOT_FOUND).send('Id not found');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addProductToCart(
    @Body() { productId, productData }: any,
    @Request() req: any,
  ): Promise<void> {
    await this.cartService.addProductToCart(
      productId,
      productData,
      req.user.userId,
    );
  }
}
