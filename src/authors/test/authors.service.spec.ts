import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'bson';
import { articleModel } from '../../articles/test/mocks/article.model';
import { Article } from '../../articles/entities/article.entity';
import { AuthorsService } from '../authors.service';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { Author } from '../entities/author.entity';
import { authorModel } from './mocks/author.model';

describe('AuthorsService', () => {
  let service: AuthorsService;

  const createAuthorDto: CreateAuthorDto = {
    name: 'Ahmed Naser',
    jobTitle: 'Web developer'
  };

  let authorId: Author['_id'];
  const createSpy = jest.spyOn(authorModel, 'create');
  const findSpy = jest.spyOn(authorModel, 'find');
  const findOneSpy = jest.spyOn(authorModel, 'findOne');
  const findByIdSpy = jest.spyOn(authorModel, 'findById');
  const findOneAndUpdateSpy = jest.spyOn(authorModel, 'findOneAndUpdate');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getModelToken(Author.name),
          useValue: authorModel
        },
        {
          provide: getModelToken(Article.name),
          useValue: articleModel
        }
      ]
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should fail creating author, name exists', async () => {
      authorModel.findOne.mockResolvedValue({ name: createAuthorDto.name });

      try {
        await service.create(createAuthorDto);
      } catch (error) {
        expect(findOneSpy).toHaveBeenCalledWith({ name: createAuthorDto.name });

        authorModel.findOne.mockImplementation(
          authorModel.defaultImplementations.findOne
        );

        expect(error).toBeInstanceOf(BadRequestException);

        expect(error.message).toEqual('There is an author with this name');
      }
    });

    it('should create with no errors', async () => {
      const createdAuthor = await service.create(createAuthorDto);

      expect(createdAuthor).toEqual(expect.objectContaining(createAuthorDto));

      expect(createSpy).toHaveBeenCalledWith(createAuthorDto);

      authorId = createdAuthor._id;
    });
  });

  describe('findAll', () => {
    it('should return empty array', async () => {
      authorModel.find.mockResolvedValue([]);

      const authors = await service.findAll();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(authors).toEqual([]);
    });

    it('should return authors array with one author', async () => {
      authorModel.find.mockImplementation(
        authorModel.defaultImplementations.find
      );

      const authors = await service.findAll();

      expect(findSpy).toHaveBeenCalledTimes(2);
      expect(authors.length).toEqual(1);
      expect(authors[0].name).toEqual(createAuthorDto.name);
    });
  });

  describe('findOne', () => {
    it('should return author object', async () => {
      const author = await service.findOne(authorId);

      expect(author).toEqual(expect.objectContaining(createAuthorDto));
    });

    it('should throw the NotFoundException', async () => {
      const randomId = new ObjectId().toString();
      try {
        await service.findOne(randomId);
      } catch (error) {
        expect(findByIdSpy).toHaveBeenCalledWith(randomId);

        expect(error).toBeInstanceOf(NotFoundException);

        expect(error.message).toEqual('Author not found');
      }
    });
  });

  describe('findAuthorArticles', () => {
    it('should return author object', async () => {
      const randomId = new ObjectId().toString();
      try {
        await service.findAuthorArticles(randomId);
      } catch (error) {
        expect(findByIdSpy).toHaveBeenCalledWith(randomId);

        expect(error).toBeInstanceOf(NotFoundException);

        expect(error.message).toEqual('There is no author with this _id');
      }
    });

    it('should get an empty array for author articles', async () => {
      const articles = await service.findAuthorArticles(authorId);

      expect(articles.length).toEqual(0);
    });
  });

  describe('update', () => {
    it('should throw author NotFoundException', async () => {
      const randomId = new ObjectId().toString();
      try {
        await service.update(randomId, { name: createAuthorDto.name });
      } catch (error) {
        expect(findByIdSpy).toHaveBeenCalledWith(randomId);

        expect(error).toBeInstanceOf(NotFoundException);

        expect(error.message).toEqual('Author not found');
      }
    });

    it('should throw author NotFoundException', async () => {
      try {
        await service.update(authorId, { name: createAuthorDto.name });
      } catch (error) {
        expect(findByIdSpy).toHaveBeenCalledWith(authorId);

        expect(error).toBeInstanceOf(BadRequestException);

        expect(error.message).toEqual('There is an author with this name');
      }
    });

    it('should update author name with no errors', async () => {
      const author = await service.update(authorId, { name: 'mohamed' });

      expect(findByIdSpy).toHaveBeenCalledWith(authorId);

      expect(author.name).toEqual('mohamed');
    });
  });
});
