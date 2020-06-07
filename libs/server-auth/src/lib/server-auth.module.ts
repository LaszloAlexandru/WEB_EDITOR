import { Module } from '@nestjs/common';
import { ServerAuthService } from './server-auth.service';
import { ServerAuthController } from './server-auth.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./server-auth.model";

@Module({
  imports: [MongooseModule.forFeature([{name:"user", schema:UserSchema}])],
  controllers: [ServerAuthController],
  providers: [ServerAuthService],
  exports: [ServerAuthService]
})
export class ServerAuthModule {}
