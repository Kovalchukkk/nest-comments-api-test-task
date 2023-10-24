import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number;
  @IsString({ message: 'Must be a string' })
  readonly value: string;
}
