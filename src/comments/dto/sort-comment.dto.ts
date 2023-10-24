import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

export class SortCommentDto {
  @ApiProperty({
    example: 'ASC',
    description: 'Sort by createdAt',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  readonly createdAt: string;
  @ApiProperty({
    example: 'ASC',
    description: 'Sort by username',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  readonly username: string;
  @ApiProperty({
    example: 'ASC',
    description: 'Sort by email',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  readonly email: string;
}
