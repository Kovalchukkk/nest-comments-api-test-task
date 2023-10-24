import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;
  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Must be greater than 4 and less than 16' })
  readonly password: string;
  @ApiProperty({ example: 'ice_cream', description: 'Username' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Must be greater than 4 and less than 16' })
  readonly username: string;
}
