import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoService } from 'src/crypto/crypto.service';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async create(userData: { username: string; password: string }) {
    const password = await this.cryptoService.hashPassword(userData.password);
    const user = new this.userModel({ username: userData.username, password });
    const { username } = await user.save();
    return { username };
  }

  async login({ password, username }: LoginDto) {
    const user = await this.userModel.findOne({ username });
    const isMatch = await this.cryptoService.comparePassword(
      password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return {
      access_token: this.jwtService.sign({ username }),
    };
  }
}
