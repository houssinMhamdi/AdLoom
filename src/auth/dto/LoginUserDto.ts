import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'email is required.' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'password is required.' })
  password: string;
}
