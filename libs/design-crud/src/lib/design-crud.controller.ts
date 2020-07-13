import {Body, Controller, Delete, Get, Post, Put, Query, Res} from '@nestjs/common';
import { DesignCrudService } from './design-crud.service';
import {GenericModificationModel, JavascriptInjectionModel, ResizeModificationModel} from "./design-crud.model";
import {environment} from "../../../../apps/web-editor-server/src/environments/environment";
import * as fs from "fs";
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
    @Query('name') name: string
  ){
    return await this.designCrudService.getDesignById(email, name);
  }

  @Put('/activate')
  async activateDesign(
    @Query('email') email: string,
    @Query('name') name:string
  ){
    return this.designCrudService.activateDesign(email, name)
  }

  @Get('/getActiveModifications')
  async getModifications(
    @Query('email') email:string,
    @Query('token') token:string
  ){
    const response =  await this.designCrudService.getActiveDesigns(email, token);
    return response;
  }

  @Get('/getFile')
  async getFile(
    @Query('email') email: string,
    @Res() res
  ){
    const defaultJs = fs.readFileSync(environment.assetsPath);

    const finishedJs = environment.production
      ? `const url='http://3.84.66.174:3333/api/design-crud/getActiveModifications?email=${email}&token=something';\n` + defaultJs
      : `const url='http://localhost:3333/api/design-crud/getActiveModifications?email=${email}&token=something';\n` + defaultJs;

    res.setHeader('Content-type', "application/octet-stream");
    res.setHeader('Content-disposition', 'attachment; filename=communication.js');
    res.send(finishedJs);
  }

  @Post('addDesign')
  async postData(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('timestamp') timestamp:string,
    @Body('active') active: boolean,
    @Body('jsModification') jsModification: [JavascriptInjectionModel],
    @Body('genericModification') genericModifications: [GenericModificationModel],
    @Body('resizeModifications') resizeModifications: [ResizeModificationModel]
  ){
    return await this.designCrudService.addDesign(email, name, active, timestamp, jsModification, genericModifications, resizeModifications)
  }

  @Delete('addDesign')
  async deleteDesign(
    @Body('email') email: string,
    @Body('name') name: string
  ){
    return this.designCrudService.deleteDesign(email, name);
  }

  @Get("getDesigns")
  async getDesigns(
    @Query('email') email: string
  ){
    return this.designCrudService.getDesigns(email);
  }
}
