import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { createUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import * as otpGenerator from 'otp-generator';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userSchema: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registerUser(data: createUserDto): Promise<any> {
    const saltOrRound = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRound);
    const userData = new this.userSchema({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    console.log('userData on userService = ', userData);
    const { _id, name } = await userData.save();
    const accessToken = await this.createToken(userData);
    return { accessToken, user: { _id, name } };
  }

  async checkIfUserExists(email: string) {
    const userData = this.userSchema.findOne({ email: email });
    return userData;
  }

  async login(data: { email: string; password: string }) {
    const user = await this.userSchema.findOne({ email: data.email });
    if (user) {
      const passwordMatch = bcrypt.compare(data.password, user.password);
      if (passwordMatch) {
        const token = await this.createToken({
          name: user.name,
          email: user.email,
          password: user.password,
        });
        return { token, user: { _id: user._id, name: user.name } };
      } else {
        return { message: 'invalid credentials' };
      }
    } else {
      return { message: 'invalid credentials' };
    }
  }
  async genrateAndSendOtp(email: string): Promise<string> {
    const otp = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('Sender_Email'),
        pass: this.configService.get<string>('Sender_Mail_Password'),
      },
    });
    console.log(
      'senderMail = ',
      this.configService.get<string>('Sender_Email'),
    );
    const mailOptions = {
      from: this.configService.get<string>('Sender_Email'),
      to: email,
      subject: 'Your OTP',
      text: `Your OTP is: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
    // const newOtp = new this.otpSchema({
    //   user,
    //   otp,
    // });
    // await newOtp.save();
    return otp;
  }

  async createToken(data: createUserDto) {
    const payload = {
      email: data.email,
      password: data.password,
    };

    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async validateUser(data: { _id: string; name: string }) {
    return await this.userSchema.findOne({ _id: data._id, name: data.name });
  }
}
