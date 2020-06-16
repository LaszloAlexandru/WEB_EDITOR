import {Body, Controller, Get, Post, Put, Query, Res} from '@nestjs/common';
import { DesignCrudService } from './design-crud.service';
import {GenericModificationModel, JavascriptInjectionModel, ResizeModificationModel} from "./design-crud.model";
import {createReadStream} from "fs";

@Controller('design-crud')
export class DesignCrudController {
  constructor(private designCrudService: DesignCrudService) {}

  @Get()
  getTestData() {
    return "It works";
  }


  @Get('/modification')
  async getModification(
    @Query('email') email: string,
    @Query('name') name: string) {
    return await this.designCrudService.getDesignById(email, name);
  }

  @Put('/activate')
  async activateDesign(
    @Query('email') email: string,
    @Query('name') name:string
  ) {
    return this.designCrudService.activateDesign(email, name)
  }

  @Get('/getActiveModifications')
  async getModifications(
    @Query('email') email:string,
    @Query('token') token:string) {
    console.log(email, token);
    const response =  await this.designCrudService.getActiveDesigns(email, token);
    console.log(response);
    return response;
  }

  @Get('/getFile')
  async getFile(
    @Res() res
  ) {
    return res.download('apps/web-editor-server/src/assets/comunication.js');
  }

  @Post('addDesign')
  async postData(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('timestamp') timestamp:string,
    @Body('active') active: boolean,
    @Body('jsModification') jsModification: [JavascriptInjectionModel],
    @Body('genericModification') genericModifications: [GenericModificationModel],
    @Body('resizeModifications') resizeModifications: [ResizeModificationModel]){

    return await this.designCrudService.addDesign(email, name, active, timestamp, jsModification, genericModifications, resizeModifications)
  }

  @Get("getDesigns")
  async getDesigns(
    @Query('email') email: string
  ) {
    return await this.designCrudService.getDesigns(email);
  }
}
