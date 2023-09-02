import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  handleRegister(@Body() registerBody: RegisterAuthDto) {
    console.log('handling register ', registerBody);
    return this.authService.registerUser(registerBody);
  }

  @Post('login')
  handleLogin(@Body() loginBody: LoginAuthDto) {
    console.log('handling login', loginBody);

    return this.authService.loginUser(loginBody);
  }
}
