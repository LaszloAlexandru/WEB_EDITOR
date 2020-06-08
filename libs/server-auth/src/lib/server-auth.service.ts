import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./server-auth.model";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

const HASH_VALUE = 10;


@Injectable()
export class ServerAuthService {

  constructor(
    @InjectModel('user') private readonly user: Model<User>,
    private jwtService: JwtService
  ) {}

  getData(): { message: string } {
    return { message: 'Welcome to web-editor-server!' };
  }

  async getUserById(email) {
    return await this.user.findOne({email: email});
  }

  async checkUserValidity(password: string, user: any) {
    const result = bcrypt.compare(password, user.password).then((res) => {
      return res;
    });
    return result;
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  async login(user) {
    console.log(user);
    if(user !== null) {
      const deconstructUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password
      };

      return {
        bearerToken: this.jwtService.sign(deconstructUser)
      }
    }

    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND)
  }

  async insertUser(name: string, email: string, password: string) {

    const encryptedPassword = await bcrypt.hash(password, HASH_VALUE);

    const newUser = new this.user({
      name,
      email,
      password: encryptedPassword
    });
    const result = await newUser.save();
    return result.id;
  }
}
