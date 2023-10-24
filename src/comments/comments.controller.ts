import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { SortCommentDto } from './dto/sort-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './comments.model';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Creating comment with file' })
  @ApiResponse({ status: 201, type: Comment })
  @Post('/files')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createCommentWithFile(
    @Body() dto: CreateCommentDto,
    @Request() req,
    @UploadedFile() file,
  ) {
    return this.commentsService.create(dto, req.user.id, file);
  }

  @ApiOperation({ summary: 'Creating comment without file' })
  @ApiResponse({ status: 201, type: Comment })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(@Body() dto: CreateCommentDto, @Request() req) {
    return this.commentsService.create(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Fetch comments (25 per page)' })
  @ApiResponse({ status: 201, type: [Comment] })
  @Post('/heads')
  async getComments(@Body() dto: SortCommentDto, @Request() req) {
    const { page } = req.query;
    return this.commentsService.get(page, dto);
  }

  @ApiOperation({ summary: 'Fetch all replies' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get('/replies')
  async getReplies(@Request() req) {
    const { parentId } = req.query;
    return this.commentsService.getReplies(parentId);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 200 })
  @Delete('/:id')
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.delete(id);
  }
}
