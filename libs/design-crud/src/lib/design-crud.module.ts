import { Module } from '@nestjs/common';
import { DesignCrudService } from './design-crud.service';
import { DesignCrudController } from './design-crud.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {DesignSchema} from "./design-crud.model";

@Module({
  imports: [MongooseModule.forFeature([{name:'design', schema:DesignSchema}])],
  controllers: [DesignCrudController],
  providers: [DesignCrudService],
  exports: [DesignCrudService]
})
export class DesignCrudModule {}
