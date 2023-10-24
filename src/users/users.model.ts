import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Bookmark } from 'src/bookmarks/bookmarks.model';
import { Comment } from 'src/comments/comments.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ice_cream', description: 'Username' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '12345', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password?: string;

  @ApiProperty({ example: 'true', description: 'Banned or not' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ example: 'Some reason', description: 'Ban reason' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles) // through table UserRoles
  roles: Role[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Bookmark)
  bookmarks: Bookmark[];
}
