import { IsEmail, IsString } from 'class-validator';
import { Dto } from 'src/common/dto';

export interface JwtPayload {
  email: string;
}

export class LoginInputDto extends Dto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  toRecord() {
    return {
      email: this.email,
      password: this.password,
    };
  }
}

export interface LoginOutputDto {
  accessToken: string;
}
