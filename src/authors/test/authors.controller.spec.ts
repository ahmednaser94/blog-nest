import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Article, ArticleSchema } from '../../articles/entities/article.entity';
import { AuthorsController } from '../authors.controller';
import { AuthorsService } from '../authors.service';
// import { AuthorsService } from '../authors.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { Author, AuthorSchema } from '../entities/author.entity';
import { authorModel } from './mocks/author.model';

describe('AuthorsController', () => {
  let controller: AuthorsController;

  const authorDto: CreateAuthorDto = {
    jobTitle: 'Web developer',
    name: 'Ahmed Naser'
  };

  let authorId;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        AuthorsService,
        {
          provide: getModelToken(Author.name),
          useValue: authorModel
        },
        {
          provide: getModelToken(Article.name),
          useValue: authorModel
        }
      ]
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOne', () => {
    it('Should fail creating author, name is required', async () => {
      authorModel.findOne.mockResolvedValue({ name: 'ahmed' });

      const author = await controller.create(authorDto);
      authorId = author._id;

      expect(author).toEqual(expect.objectContaining(authorDto));
    });

    describe('Otherwise', () => {
      it('should throw the NotFoundException', async () => {
        // const author = await service.findOne('');
      });
    });
  });

  describe('findOne', () => {
    describe('when author with ID exists', () => {
      it('should return author object', async () => {
        const author = await controller.findOne(authorId);

        expect(author).toEqual(expect.objectContaining(authorDto));
      });
    });

    describe('Otherwise', () => {
      it('should throw the NotFoundException', async () => {
        // const author = await service.findOne('');
      });
    });
  });
});
