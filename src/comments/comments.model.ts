import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Bookmark } from 'src/bookmarks/bookmarks.model';
import { User } from 'src/users/users.model';

interface CommentCreationAttrs {
  content: string;
  parentId: number; // FK(Comment)
  userId: number;
  image: string;
  file: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Lorem ipsum dollar',
    description: 'Content of comment',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ApiProperty({
    example: 'ffdfb681-cfe8-4796-9bbb-681fd715d8ce.jpg',
    description: 'Specific image of comment',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  image: string;

  @ApiProperty({
    example: '5f5ec6a0-0ef9-40a2-9e55-97d4b86165b4.txt',
    description: 'Specific .txt file of comment',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  file: string;

  @ApiProperty({
    example: '1',
    description: 'Unique id of author',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number; // owner of comment

  @ApiProperty({
    example: '1 or null',
    description:
      'Unique id of head comment (may be null if it is head comment)',
  })
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  parentId: number;

  @BelongsTo(() => User, { as: 'author' })
  author: User;

  @HasMany(() => Bookmark)
  bookmarks: Bookmark[];
}
