import { HttpException, HttpStatus } from '@nestjs/common';
import type { ErrorCode } from '../constants/error-codes.constant';

/**
 * BusinessException — for throwing domain-specific errors with structured payloads.
 * Use this instead of throwing raw HttpExceptions in service layer.
 *
 * @example
 * throw new BusinessException('Room not found', ERROR_CODES.ROOM_NOT_FOUND, HttpStatus.NOT_FOUND);
 */
export class BusinessException extends HttpException {
  public readonly errorCode: ErrorCode;

  constructor(
    message: string,
    errorCode: ErrorCode,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        success: false,
        message,
        errorCode,
        statusCode: status,
      },
      status,
    );
    this.errorCode = errorCode;
  }
}
