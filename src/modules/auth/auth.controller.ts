import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputDto, LoginOutputDto } from './auth.dto';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() signInDto: LoginInputDto): Promise<LoginOutputDto> {
    return this.authService.login(signInDto.toRecord());
  }
}
