import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpenAIModule } from 'nestjs-openai';
import { MongooseAsyncConfig } from './config/mongo.config';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './config/graphql.config';
import { UserModule } from './user/user.module';
import 'dotenv/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OpenAIModule.register({
      apiKey: process.env.OPENAI_API_KEY,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseAsyncConfig,
    }),
    UserModule,
  ],
})
export class AppModule {}
