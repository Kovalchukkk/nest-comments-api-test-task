import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Lorem ipsum dollar set amet',
    description: 'Content of comment',
  })
  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  readonly content: string;
  @ApiProperty({
    example: '25',
    description: 'Id of head comment (optional)',
  })
  @IsOptional()
  readonly parentId: number;
}
