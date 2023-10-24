import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Bookmark } from './bookmarks.model';

@Module({
  providers: [BookmarksService],
  controllers: [BookmarksController],
  imports: [SequelizeModule.forFeature([Bookmark]), AuthModule],
})
export class BookmarksModule {}
