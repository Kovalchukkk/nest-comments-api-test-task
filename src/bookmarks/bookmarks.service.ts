import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Bookmark } from './bookmarks.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Comment } from 'src/comments/comments.model';
import { User } from 'src/users/users.model';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectModel(Bookmark) private readonly bookmarkRepository: typeof Bookmark,
  ) {}

  async create(dto: CreateBookmarkDto, ownerId: number) {
    const candidate = await this.bookmarkRepository.findOne({
      where: { userId: ownerId, commentId: dto.commentId },
    });
    if (candidate) {
      throw new BadRequestException({
        message: 'user already added this comment to bookmarks',
      });
    }
    const bookmark = await this.bookmarkRepository.create({
      ...dto,
      userId: ownerId,
    });
    return bookmark;
  }

  async getBookmarksByUserId(userId: number) {
    const bookmarks = await this.bookmarkRepository.findAll({
      include: [
        {
          model: Comment,
          as: 'comment',
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['username', 'email'],
            },
          ],
        },
      ],
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    if (!bookmarks.length) {
      throw new HttpException('Bookmarks not found', HttpStatus.NOT_FOUND);
    }

    return bookmarks;
  }
}
