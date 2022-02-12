import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { AuthorIdParamDto } from './dto/find-one-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {
  ApiParam,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse
} from '@nestjs/swagger';
import { Author } from './entities/author.entity';
import { Article } from '../articles/entities/article.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ description: 'Create an author' })
  @ApiBody({
    type: CreateAuthorDto
  })
  @ApiCreatedResponse({
    description: 'The author has been successfully created.',
    type: Author
  })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ description: 'Fetch all authors' })
  @ApiOkResponse({
    type: [Author]
  })
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({ description: 'Fetch an author using its _id' })
  @ApiParam({
    name: '_id',
    description: 'Author ObjectId',
    example: '62055430c52b99d17554c9c6'
  })
  @ApiOkResponse({
    type: Author
  })
  @Get(':_id')
  findOne(
    @Param()
    params: AuthorIdParamDto
  ) {
    return this.authorsService.findOne(params._id);
  }

  @ApiParam({
    name: '_id',
    description: 'Author ObjectId',
    example: '62055430c52b99d17554c9c6'
  })
  @ApiOperation({ description: 'Fetch all articles for a certain author' })
  @ApiOkResponse({
    type: [Article]
  })
  @Get(':_id/articles')
  findAuthorArticles(@Param() params: AuthorIdParamDto) {
    return this.authorsService.findAuthorArticles(params._id);
  }

  @ApiParam({
    name: '_id',
    description: 'Author ObjectId',
    example: '62055430c52b99d17554c9c6'
  })
  @ApiOkResponse({
    type: Author,
    status: 200
  })
  @ApiOperation({ description: 'Update an author name' })
  @Patch(':_id')
  update(@Param() params, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(params._id, updateAuthorDto);
  }

  // @Delete(':_id')
  // remove(@Param() params: AuthorIdParamDto) {
  //   return this.authorsService.remove(params._id);
  // }
}
