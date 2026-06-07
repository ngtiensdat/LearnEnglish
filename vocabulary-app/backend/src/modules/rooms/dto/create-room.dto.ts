import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên phòng không được trống' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  password: string;

  @IsOptional()
  @IsBoolean()
  showScore?: boolean;
}
