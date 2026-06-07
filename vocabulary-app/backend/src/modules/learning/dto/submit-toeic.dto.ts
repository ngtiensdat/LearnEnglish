import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
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
  testId: string;

  @IsString()
  @IsNotEmpty()
  part: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmitToeicAnswerDto)
  answers: SubmitToeicAnswerDto[];
}
