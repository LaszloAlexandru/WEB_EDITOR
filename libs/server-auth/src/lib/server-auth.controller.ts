import {Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query} from '@nestjs/common';
import { ServerAuthService } from './server-auth.service';

@Controller('auth')
export class ServerAuthController {
  constructor(private serverAuthService: ServerAuthService) {}

  @Get('/total')
  getData() {
    this.serverAuthService.getData();
  }

  @Get()
  getUser(@Body('email') id:string,
          @Body('password') password:string) {
    return this.serverAuthService.getUserById(id);
}


  @Post('/verify')
  verifyToken(@Body('bearerToken') bearerToken:string) {

    return this.serverAuthService.verifyToken(bearerToken);
  }

  @Post('/login')
  async login(
    @Body('email') email:string,
    @Body('password') password:string) {

      const user = await this.serverAuthService.getUserById(email);
      const userValidity = await this.serverAuthService.checkUserValidity(password, user);

      if(userValidity) {
        return this.serverAuthService.login(user);
      }

      throw new HttpException("User does not exist", HttpStatus.NOT_FOUND)

  }

  @Post()
  async postData(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string) {
    const user = await this.serverAuthService.getUserById(email);
    if(user === null){
      return this.serverAuthService.insertUser(name, email, password);
    }
    throw new HttpException("Email already exists", HttpStatus.CONFLICT)
  }


}
