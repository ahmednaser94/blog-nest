import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AddCommentToArticleDto } from './dto/add-comment.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import {
  ArticleIdParamDto,
  FindOneArticleByTitleDto,
} from './dto/find-one-article.dto';
import { ArticlesSort } from './interfaces';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Post(':_id/comments')
  addComment(
    @Param() params: ArticleIdParamDto,
    @Body() addCommentToArticleDto: AddCommentToArticleDto,
  ) {
    return this.articlesService.addComment(params._id, addCommentToArticleDto);
  }

  @Get()
  findAll(@Query('sort') sortQuery?: string) {
    return this.articlesService.findAll(sortQuery);
  }

  @Get('/search')
  findOneByTitle(@Body() findOneArticleByTitleDto: FindOneArticleByTitleDto) {
    return this.articlesService.findByTitle(findOneArticleByTitleDto.title);
  }

  @Get(':_id')
  findOne(@Param() params: ArticleIdParamDto) {
    return this.articlesService.findOne(params._id);
  }

  @Patch(':_id/likes')
  update(@Param() params: ArticleIdParamDto) {
    return this.articlesService.incrementLikes(params._id);
  }

  @Delete(':_id')
  remove(@Param() params: ArticleIdParamDto) {
    return this.articlesService.remove(params._id);
  }
}
