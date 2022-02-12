import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCommentToArticleDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  body: string;
}
