import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './Users.service';
import { User } from './users.schema';
import { UsersDto } from './dto/users.dto';
import { ordersDto } from './dto/orders.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getAll(@Res() res: any): Promise<User[]> {
    try {
      let users = await this.usersService.getUsers();
      return await res.status(HttpStatus.OK).send(users);
    } catch {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send('No se han encontrado users');
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id') userId: string,
    @Res() res: any,
  ): Promise<User | null> {
    try {
      const user = await this.usersService.findUserById(userId);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send('Usuario no encontrado');
      }
      return res.status(HttpStatus.OK).send(user);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'Error interno del servidor al buscar el usuario por ID',
      });
    }
  }

  @Post('register')
  async newUser(@Res() res: any, @Body() body: UsersDto): Promise<User> {
    try {
      const existingUser = await this.usersService.findUserByUsername(
        body.username,
      );
      console.log(existingUser);
      if (existingUser) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          errorType: 'usernameExists',
          message: 'El nombre de usuario ya está en uso',
        });
      }
      const existingEmail = await this.usersService.findUserByEmail(body.email);
      if (existingEmail) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          errorType: 'emailExists',
          message: 'El correo electrónico ya está registrado',
        });
      }

      const newUser = await this.usersService.createUser(body);
      console.log(newUser);
      return res.status(HttpStatus.OK).send(newUser);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: 'Error interno del servidor al crear un nuevo usuario',
      });
    }
  }

  @Post(':userId/orders')
  async addOrder(@Param('userId') userId: string, @Body() orderDto: ordersDto) {
    console.log(orderDto);

    return this.usersService.addOrderToUser(userId, orderDto);
  }
}