import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Comment } from 'src/comments/comments.model';
import { ApiProperty } from '@nestjs/swagger';

interface BookmarkCreationAttrs {
  userId: number;
  commentId: number;
}

@Table({ tableName: 'bookmarks' })
export class Bookmark extends Model<Bookmark, BookmarkCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Unique id of bookmark owner' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number; // owner of bookmark

  @ApiProperty({
    example: '1',
    description: 'Unique id of comment that was added to bookmarks',
  })
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  commentId: number;

  @BelongsTo(() => Comment, { as: 'comment' })
  comment: Comment;
}
