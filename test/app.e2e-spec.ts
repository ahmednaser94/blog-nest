import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthorsService } from '../src/authors/authors.service';
import { ArticlesService } from '../src/articles/articles.service';
import { getModelToken } from '@nestjs/mongoose';
import { Author } from '../src/authors/entities/author.entity';
import { authorModel } from '../src/authors/test/mocks/author.model';
import { Article } from '../src/articles/entities/article.entity';
import { articleModel } from '../src/articles/test/mocks/article.model';

describe('Author Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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
    })
      // .overrideProvider(AuthorsService)
      // .useValue({
      //   provide: getModelToken(Author.name),
      //   useValue: authorModel
      // })
      // .overrideProvider(ArticlesService)
      // .useValue({
      //   provide: getModelToken(Article.name),
      //   useValue: articleModel
      // })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', (done) => {
    request(app.getHttpServer())
      .get('/v1/authors')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual([]);
        done();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
