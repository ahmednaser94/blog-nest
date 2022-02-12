import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AddCommentToArticleDto } from './dto/add-comment.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import {
  ArticleIdParamDto,
  FindOneArticleByTitleDto
} from './dto/find-one-article.dto';
import {
  ApiParam,
  ApiBody,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse
} from '@nestjs/swagger';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ description: 'Create an article for an author' })
  @ApiBody({
    type: CreateArticleDto
  })
  @ApiCreatedResponse({
    description: 'The article has been successfully created.',
    type: Article,
    status: 201
  })
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @ApiOperation({ description: 'Add comment for a specific article' })
  @ApiParam({
    name: '_id',
    description: 'Article ObjectId',
    example: '62055430c52b99d17554c9c6'
  })
  @ApiBody({
    type: AddCommentToArticleDto
  })
  @ApiCreatedResponse({
    type: Article,
    status: 201
  })
  @Post(':_id/comments')
  addComment(
    @Param() params: ArticleIdParamDto,
    @Body() addCommentToArticleDto: AddCommentToArticleDto
  ) {
    return this.articlesService.addComment(params._id, addCommentToArticleDto);
  }

  @ApiOperation({
    description:
      'Find all articles, can be sorted by liked ascending or descending'
  })
  @ApiOkResponse({
    type: [Article]
  })
  @Get()
  findAll(@Query('sort') sortQuery?: string) {
    return this.articlesService.findAll(sortQuery);
  }

  @ApiOperation({
    description: 'Find all articles that matches with typed title'
  })
  @ApiOkResponse({
    type: [Article]
  })
  @Get('/search')
  @ApiBody({
    type: FindOneArticleByTitleDto
  })
  @ApiOkResponse({
    type: Article
  })
  findOneByTitle(@Body() findOneArticleByTitleDto: FindOneArticleByTitleDto) {
    return this.articlesService.findByTitle(findOneArticleByTitleDto.title);
  }

  @ApiParam({
    name: '_id',
    description: 'Article ObjectId',
    example: '62055430c52b99d17554c9c6'
  })
  @ApiOkResponse({
    type: Article
  })
  @Get(':_id')
  findOne(@Param() params: ArticleIdParamDto) {
    return this.articlesService.findOne(params._id);
  }

  @ApiParam({
    name: '_id',
    description: 'Article ObjectId',
    example: '62055430c52b99d17554c9c6'
  })
  @ApiOkResponse({
    type: Article
  })
  @Patch(':_id/likes')
  update(@Param() params: ArticleIdParamDto) {
    return this.articlesService.incrementLikes(params._id);
  }
}
