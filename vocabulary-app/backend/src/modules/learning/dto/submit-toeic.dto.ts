import { IsArray, IsNotEmpty, IsString, ValidateNested, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class SubmitToeicAnswerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  selected: string;
}

export class SubmitToeicDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_-]+$/)
  testId: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_-]+$/)
  part: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitToeicAnswerDto)
  answers: SubmitToeicAnswerDto[];
}
