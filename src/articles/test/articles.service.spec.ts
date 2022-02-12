import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from '../articles.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { Article } from '../entities/article.entity';
import { getModelToken } from '@nestjs/mongoose';
import { articleModel } from './mocks/article.model';

describe('ArticlesService', () => {
  let service: ArticlesService;

  const createArticleDto: CreateArticleDto = {
    author: '62055ec72eb024bab1291f72',
    title: 'first testing',
    body: 'test description'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getModelToken(Article.name),
          useValue: articleModel
        }
      ]
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOne', () => {
    describe('when article inputs are valid', () => {
      it('should return article object', async () => {
        const expectedArticle = {
          ...createArticleDto,
          _id: '1',
          likes: 0,
          comments: []
        };

        const article = await service.create(createArticleDto);

        expect(article).toEqual(expectedArticle);
      });
    });

    describe('Otherwise', () => {
      it('should throw the NotFoundException', async () => {
        const article = await service.create(createArticleDto);

        expect(article).toEqual({});
      });
    });
  });

  describe.skip('findOne', () => {
    describe('when article with ID exists', () => {
      it('should return article object', async () => {
        const expectedArticle = {
          ...createArticleDto,
          _id: '1',
          likes: 0,
          comments: []
        };

        const article = await service.findOne('1');

        expect(article).toEqual(expectedArticle);
      });
    });

    describe('Otherwise', () => {
      it('should throw the NotFoundException', async () => {
        // const author = await service.findOne('')
      });
    });
  });
});
