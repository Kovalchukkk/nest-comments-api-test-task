import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { Comment } from './comments/comments.model';
import { CommentsModule } from './comments/comments.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { Bookmark } from './bookmarks/bookmarks.model';
import { AppGateway } from 'app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.DATABASE_PRIVATE_URL,
      models: [User, Role, UserRoles, Comment, Bookmark],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    CommentsModule,
    FilesModule,
    BookmarksModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
