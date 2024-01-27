import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
