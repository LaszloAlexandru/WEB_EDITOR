import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { DesignCrudService } from './design-crud.service';
import {GenericModificationModel, JavascriptInjectionModel, ResizeModificationModel} from "./design-crud.model";

@Controller('design-crud')
export class DesignCrudController {
  constructor(private designCrudService: DesignCrudService) {}

  @Get()
  getTestData() {
    return "It works";
  }


  @Get('/modification')
  async getModification(
    @Body('email') email: string,
    @Body('name') name: string) {
    return await this.designCrudService.getDesignById(email, name);
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


  @Post('addDesign')
  async postData(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('active') active: boolean,
    @Body('jsModification') jsModification: [JavascriptInjectionModel],
    @Body('genericModification') genericModifications: [GenericModificationModel],
    @Body('resizeModifications') resizeModifications: [ResizeModificationModel],){

    return await this.designCrudService.addDesign(email, name, active, jsModification, genericModifications, resizeModifications)
  }
}
