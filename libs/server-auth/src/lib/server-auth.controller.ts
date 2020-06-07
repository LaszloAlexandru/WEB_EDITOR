import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import { ServerAuthService } from './server-auth.service';

@Controller('auth')
export class ServerAuthController {
  constructor(private serverAuthService: ServerAuthService) {}

  @Get()
  getData() {
    this.serverAuthService.getData();
  }

  @Get(':id')
  getUser(@Query('email') id:string,
          @Query('password') password:string) {
    console.log(password);
    return this.serverAuthService.getUserById(id);
}

  @Post()
  async postData(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.serverAuthService.insertUser(email, password);
  }
}
