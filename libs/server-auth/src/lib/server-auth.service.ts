import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./server-auth.model";
import * as bcrypt from 'bcrypt';

@Injectable()
export class ServerAuthService {

  constructor(@InjectModel('user') private readonly user: Model<User> ) {}

  getData(): { message: string } {
    return { message: 'Welcome to web-editor-server!' };
  }

  async getUserById(email) {
    const user = this.user.findOne({email: email});
    console.log(user);
    return user;
  }


  async insertUser(email: string, password: string) {

    const encryptedPassword = await bcrypt.hash(password, 10);

    console.log(encryptedPassword);

    const newUser = new this.user({
      email,
      password: encryptedPassword
    });
    const result = await newUser.save();
    return result.id;
  }
}
