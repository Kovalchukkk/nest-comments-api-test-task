import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({
    example: '25',
    description: 'Id of comment',
  })
  @IsNotEmpty()
  @IsInt({ message: 'Must be an integer' })
  readonly commentId: number;
}
