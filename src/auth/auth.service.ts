import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/entities/user.entity';
import { HashingService } from './hashing/hashing.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,

    private jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email is already in use.');
    }

    const hashedPassword = await this.hashingService.hash(password);

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      return await newUser.save();
    } catch (error) {
      throw new Error('Error saving user to the database.');
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await this.hashingService.compare(
      password,
      user.password,
    );
    if (isPasswordValid) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      user: user,
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
      }),
    };
  }
}
