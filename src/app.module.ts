import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsModule } from './authors/authors.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { AppController } from './app.controller';
config({ path: '.env' });

@Module({
  imports: [
    ArticlesModule,
    AuthorsModule,
    RouterModule.register([
      {
        path: '/v1',
        module: ArticlesModule
      },
      {
        path: '/v1',
        module: AuthorsModule
      }
    ]),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      connectionFactory: (connection) => {
        // connection.plugin(autoPopulate);
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    })
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
