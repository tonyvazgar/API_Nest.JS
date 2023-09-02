import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from 'src/users/model/users.scheme';
import { Model } from 'mongoose';
import { comparePlainToHash, plainToHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
  ) {}

  async registerUser(registerUserDto: RegisterAuthDto) {
    const { password, ...user } = registerUserDto;

    const newPassword = await plainToHash(password);

    const newDto: RegisterAuthDto = {
      password: newPassword,
      ...user,
    };

    return this.userModel.create(newDto);
  }

  async loginUser(loginUserDto: LoginAuthDto) {
    const existsAuth = await this.userModel.findOne({
      email: loginUserDto.email,
    });

    if (!existsAuth)
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const { password } = loginUserDto;
    const passwordFromDB = existsAuth.password;

    const isSamePassword = await comparePlainToHash(password, passwordFromDB);
    if (!isSamePassword)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const userFlat = existsAuth.toObject();
    delete userFlat.password;

    const payload = {
      id: userFlat._id,
      name: userFlat.name,
    };

    const token = this.jwtService.sign(payload);

    return { token, user: userFlat };
  }
}
