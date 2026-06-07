import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class ReviewVocabDto {
  @IsString()
  @IsNotEmpty()
  vocabId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number; // 1 = hard, 3 = medium, 5 = easy
}
