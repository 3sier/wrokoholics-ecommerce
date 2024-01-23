import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './users.schema';
import { Model } from 'mongoose';
import { UsersDto } from './dto/users.dto';
import { ordersDto } from './dto/orders.dto';

@Injectable()
export class UsersService {
  userRepository: any;
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) { }

  async getUsers(): Promise<User[]> {
    return await this.usersModel.find();
  }

  async findOne(credentials: {
    username: string;
    password: string;
  }): Promise<User> {
    const { username, password } = credentials;
    return await this.usersModel.findOne({ username, password }).lean();
  }

  async createUser(userDto: UsersDto): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.lastname = userDto.lastname;
    user.email = userDto.email;
    user.username = userDto.username;
    user.password = userDto.password;
    user.orders = userDto.orders;

    try {
      await this.usersModel.create(user);
      return user;
    } catch (error) {
      console.error('Error al guardar el usuario', error);
      throw new InternalServerErrorException('Error al guardar el usuario');
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.usersModel.findOne({ username }).exec();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.usersModel.findOne({ email }).exec();
  }

  async findUserById(userId: string): Promise<User | null> {
    try {
      const user = await this.usersModel.findById(userId).exec();
      return user;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Usuario no encontrado');
    }
  }
  async addOrderToUser(userId: string, orderDto: ordersDto): Promise<User> {
    try {
      const user = await this.usersModel.findById(userId);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      user.orders.push(orderDto);
      await user.save();
      return user;
    } catch (error) {
      console.error('Error al añadir pedido al usuario', error);
      throw new InternalServerErrorException(
        'Error al añadir pedido al usuario',
      );
    }
  }
}
