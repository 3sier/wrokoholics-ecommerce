import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
  ) { }

  async getCartById(userId: string): Promise<Cart | null> {
    return await this.cartModel.findOne({ userId: userId }).exec();
  }

  async addProductToCart(
    _id: string,
    productData: number,
    userId: string,
  ): Promise<void> {
    let cart = await this.cartModel.findOne({ userId: userId });

    if (!cart) {
      cart = await this.cartModel.create({
        userId: userId,
        productos: [{ productId: _id, cantidad: productData }],
      });
    }

    const productIndex = cart.productos.findIndex(
      (producto) => producto.productId === _id,
    );

    if (productIndex > -1) {
      cart.productos[productIndex].cantidad += productData;
    } else {
      cart.productos.push({
        productId: _id,
        cantidad: productData,
      });
    }
    cart.markModified('productos');

    await cart.save();
  }
}
