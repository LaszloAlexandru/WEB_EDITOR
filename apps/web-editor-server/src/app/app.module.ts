import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ServerAuthModule} from "@web-editor/server-auth";
import {DesignCrudModule} from "@web-editor/design-crud";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://TestUser:NSLKDrhDjOmtEKeY@web-editor-mp3gm.mongodb.net/Web-Editor?retryWrites=true&w=majority'),
    ServerAuthModule,
    DesignCrudModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
