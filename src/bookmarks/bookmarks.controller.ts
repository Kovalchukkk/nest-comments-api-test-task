import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Bookmark } from './bookmarks.model';

@ApiTags('Bookmarks')
@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @ApiOperation({ summary: 'Creating bookmark' })
  @ApiResponse({ status: 201, type: Bookmark })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createBookmark(@Body() dto: CreateBookmarkDto, @Request() req) {
    return this.bookmarksService.create(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Fetch all bookmarks' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getBookmarks(@Request() req) {
    return this.bookmarksService.getBookmarksByUserId(req.user.id);
  }
}
