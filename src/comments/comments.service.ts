import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comments.model';
import { paginate } from 'src/helpers/pagination';
import { User } from 'src/users/users.model';
import { SortCommentDto } from './dto/sort-comment.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import PQueue from 'p-queue';

@Injectable()
export class CommentsService {
  private _queue: PQueue;
  constructor(
    @InjectModel(Comment) private readonly commentRepository: typeof Comment,
    private readonly filesService: FilesService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this._queue = new PQueue({ concurrency: 10 });
    this._queue.on('idle', () => {
      console.log('All tasks have been completed.');
    });
  }

  async create(dto: CreateCommentDto, ownerId: number, file?: any) {
    return this._queue.add(async () => {
      const commentInstance = await this.createCommentInstance(
        dto,
        ownerId,
        file,
      );
      const comment = await this.commentRepository.create(commentInstance);
      this.eventEmitter.emit('comment.new', comment);
      return comment;
    });
  }

  private async createCommentInstance(
    dto: CreateCommentDto,
    ownerId: number,
    file?: any,
  ) {
    let fileName = null;
    let createObj = {};

    if (file) {
      if (file.mimetype === 'text/plain') {
        fileName = await this.filesService.createTxtFile(file);
        createObj = {
          ...dto,
          userId: ownerId,
          file: fileName,
        };
        return createObj;
      } else {
        fileName = await this.filesService.createImageFile(file);
        createObj = {
          ...dto,
          userId: ownerId,
          image: fileName,
        };
        return createObj;
      }
    }

    return {
      ...dto,
      userId: ownerId,
    };
  }

  async get(page: number, dto: SortCommentDto) {
    const { count, rows } = await this.commentRepository.findAndCountAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['username', 'email'], // select only the username and email
        },
      ],
      where: { parentId: null },
      ...paginate({ page }),
      order: [
        [{ model: User, as: 'author' }, 'username', dto?.username ?? 'ASC'],
        [{ model: User, as: 'author' }, 'email', dto?.email ?? 'ASC'],
        ['createdAt', dto?.createdAt ?? 'DESC'],
      ],
    });
    return {
      totalCount: count,
      rows,
    };
  }

  async getReplies(parentId: number) {
    const { count, rows } = await this.commentRepository.findAndCountAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['username', 'email'], // select only the username and email
        },
      ],
      where: { parentId },
      order: [
        [{ model: User, as: 'author' }, 'username', 'ASC'],
        [{ model: User, as: 'author' }, 'email', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });

    if (!rows.length) {
      throw new HttpException('Replies not found', HttpStatus.NOT_FOUND);
    }

    return {
      totalCount: count,
      rows,
    };
  }

  async delete(id: number) {
    const row = await this.commentRepository.findOne({
      where: { id },
    });

    if (row) {
      return await row.destroy(); // deletes the row
    }
    throw new NotFoundException();
  }
}
