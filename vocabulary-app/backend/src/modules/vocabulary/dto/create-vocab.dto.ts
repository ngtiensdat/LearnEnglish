import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVocabDto {
  @IsString()
  @IsNotEmpty({ message: 'Từ vựng không được trống' })
  word: string;

  @IsString()
  @IsNotEmpty({ message: 'Nghĩa không được trống' })
  meaning: string;

  @IsOptional()
  @IsString()
  example?: string;

  @IsString()
  @IsNotEmpty({ message: 'Room ID không được trống' })
  roomId: string;
}
