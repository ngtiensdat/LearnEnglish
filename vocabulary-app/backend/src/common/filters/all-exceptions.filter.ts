import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    let code = 'INTERNAL_SERVER_ERROR';
    let details: any = null;

    if (exception instanceof HttpException) {
      const resBody: any = exception.getResponse();
      message = typeof resBody === 'object' && resBody.message ? resBody.message : exception.message;
      code = typeof resBody === 'object' && resBody.error ? resBody.error.toUpperCase().replace(/\s+/g, '_') : 'HTTP_EXCEPTION';
      
      // If it's a validation pipe error, there might be detailed message array
      if (typeof resBody === 'object' && Array.isArray(resBody.message)) {
        details = resBody.message;
        message = 'Validation failed';
        code = 'VALIDATION_ERROR';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      code = exception.name.toUpperCase().replace(/\s+/g, '_');
      console.error('Unhandled Exception:', exception);
    }

    response.status(status).json({
      success: false,
      data: null,
      meta: null,
      errors: {
        code,
        message,
        details,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
