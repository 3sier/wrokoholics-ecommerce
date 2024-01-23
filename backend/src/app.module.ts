import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt.strategy';
import { CartModule } from './cart/cart.module';
import { CoomingNextModule } from './cooming-next/cooming-next.module';
import { CuponesModule } from './cupones/cupones.module';
import { HistorialModule } from './historial/historial.module';
import { ProductosModule } from './productos/productos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://Evesofar:${process.env.PASSWORD}@cluster0.yj85kr1.mongodb.net/?retryWrites=true&w=majority`,
    ),
    AuthModule,
    UsersModule,
    CartModule,
    CoomingNextModule,
    CuponesModule,
    HistorialModule,
    ProductosModule,
  ],
  controllers: [AppController],

  providers: [AppService, JwtAuthGuard],
})
export class AppModule { }
