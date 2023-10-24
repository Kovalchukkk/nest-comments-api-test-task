import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createImageFile(imageFile): Promise<string> {
    // check jpg, gif, png
    let fileName = '';
    try {
      switch (imageFile.mimetype) {
        case 'image/jpeg':
          fileName = uuid.v4() + '.jpg';
          break;
        case 'image/gif':
          fileName = uuid.v4() + '.gif';
          break;
        case 'image/png':
          fileName = uuid.v4() + '.png';
          break;
        default:
          throw new BadRequestException('file extension is not valid');
      }

      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), imageFile.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createTxtFile(txtFile): Promise<string> {
    try {
      const fileName = uuid.v4() + '.txt';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), txtFile.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Some errors occurred when file uploaded',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
