import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Productos, ProductosDocument } from './productos.schema';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Productos.name)
    private productosModel: Model<ProductosDocument>,
  ) { }

  async getProductos(): Promise<Productos[]> {
    return await this.productosModel.find();
  }

  async getProductosById(id: string): Promise<Productos[]> {
    return await this.productosModel.findById(id);
  }

  async getProductosByCat(category: string): Promise<Productos[]> {
    return await this.productosModel.find({ category: category });
  }

  async getProductosByName(name: string): Promise<Productos[]> {
    return await this.productosModel.find({ name: name });
  }

  async getProductosByColor(color: string): Promise<Productos[]> {
    return await this.productosModel.find({
      $or: [{ 'colors.color': color }, { colors: color }],
    });
  }

  async getProductosByPrice(price: any): Promise<Productos[]> {
    let intPrice = parseInt(price);

    return await this.productosModel.find({
      $or: [{ price: intPrice }, { price: intPrice }],
    });
  }

  async getCategory(): Promise<Productos[]> {
    return await this.productosModel.find().distinct('category');
  }



  // async updateFavorite(_id: string, price: string, size: string, quantity: number) {
  //   console.log(_id);

  //   try {
  //     const productData = await this.productosModel.findById(_id);

  //     if (!productData) {
  //       console.error("product not found");
  //       return null;
  //     }

  //     let newTempProductList = [];


  //     if (localStorage.includes(_id)) {

  //       newTempProductList = localStorage.filter(id => id !== _id);
  //       console.log("if", newTempProductList);

  //     } else {

  //       newTempProductList = [...localStorage, _id];
  //       console.log("else", newTempProductList);

  //     }
  //     console.log(newTempProductList);

  //     const updatedProduct = await this.productosModel.findByIdAndUpdate(
  //       _id,
  //       { new: true, select: 'Product saved' }
  //     );

  //     return updatedProduct;
  //   } catch (error) {
  //     console.error("Error updating cart:", error);
  //     return null;
  //   }

  // }





  async updateFavorite(_id, size, quantity) {
    console.log(_id);

    try {
      const productData = await this.productosModel.findById(_id);

      if (!productData) {
        console.error("Product not found");
        return null;
      }

      let storedProducts = JSON.parse(localStorage.getItem('products')) || [];

      const foundIndex = storedProducts.findIndex(p => p.id === _id);

      if (foundIndex !== -1) {
        storedProducts[foundIndex].size = size;
        storedProducts[foundIndex].quantity = quantity;
      } else {
        storedProducts.push({ id: _id, size, quantity });
      }

      localStorage.setItem('products', JSON.stringify(storedProducts));

      return foundIndex !== -1 ? storedProducts[foundIndex] : { id: _id, size, quantity };
    } catch (error) {
      console.error("Error updating favorite:", error);
      return null;
    }
  }
}