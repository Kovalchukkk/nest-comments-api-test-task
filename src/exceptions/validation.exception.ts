import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(public messages, response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
