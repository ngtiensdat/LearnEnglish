import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty({ message: 'Nội dung câu hỏi không được trống' })
  content: string;

  @IsArray()
  @ArrayMinSize(4, { message: 'Phải có đúng 4 đáp án' })
  @ArrayMaxSize(4, { message: 'Phải có đúng 4 đáp án' })
  @IsString({ each: true })
  options: string[];

  @IsInt()
  @Min(0)
  @Max(3)
  correctAnswer: number;
}

export class AddQuestionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
