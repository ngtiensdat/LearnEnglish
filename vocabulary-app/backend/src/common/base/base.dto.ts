import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Base pagination DTO — extend this in any list endpoint.
 */
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

/**
 * Standard API response envelope.
 */
export class ApiResponseDto<T> {
  success: boolean;
  data: T;
  message?: string;

  constructor(data: T, message?: string) {
    this.success = true;
    this.data = data;
    this.message = message;
  }

  static ok<T>(data: T, message?: string): ApiResponseDto<T> {
    return new ApiResponseDto(data, message);
  }
}
