import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
