import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorIdParamDto } from './dto/find-one-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':_id')
  findOne(@Param() params: AuthorIdParamDto) {
    return this.authorsService.findOne(params._id);
  }

  @Patch(':_id')
  update(@Param() params, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(params._id, updateAuthorDto);
  }

  @Delete(':_id')
  remove(@Param() params: AuthorIdParamDto) {
    return this.authorsService.remove(params._id);
  }
}
