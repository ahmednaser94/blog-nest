import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';
import { AuthorDocument } from 'src/authors/entities/author.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({ example: 'ObjectId', type: 'ObjectId' })
  @IsMongoId()
  @IsNotEmpty()
  author: AuthorDocument['_id'];
}
