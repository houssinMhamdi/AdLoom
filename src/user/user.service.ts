import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CompleteVenueOwnerProfileDto } from './dto/complete-VenueOwner-profile.dto';
import { CompleteAdvertiserProfileDto } from './dto/complete-advertiser-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async completeProfile(
    userId: string,
    dto: CompleteAdvertiserProfileDto | CompleteVenueOwnerProfileDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    // if (user.status === 'rejected') {
    //   throw new BadRequestException(
    //     `your Profile is rejected you cannot be access to the system: ${user.profileStatus}`,
    //   );
    // }

    if (user.role === 'advertiser') {
      const { companyName, businessType, licenseNumber, location } =
        dto as CompleteAdvertiserProfileDto;
      user.companyName = companyName;
      user.businessType = businessType;
      user.licenseNumber = licenseNumber;
      user.location = location;
    } else if (user.role === 'venueOwner') {
      const { venueName, venueType, licenseNumber, location, numberOfTVs } =
        dto as CompleteVenueOwnerProfileDto;
      user.venueName = venueName;
      user.venueType = venueType;
      user.licenseNumber = licenseNumber;
      user.location = location;
      user.numberOfTVs = numberOfTVs;
    } else {
      throw new BadRequestException('Invalid role for profile completion');
    }
    user.profileStatus = 'pending';
    return await user.save();
  }

  async getpendingUsers(limit = 10, skip = 0): Promise<User[]> {
    return this.userModel
      .find({ profileStatus: 'pending' })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async approveUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    user.status = 'active';
    user.profileStatus = 'complete';
    return user.save();
  }

  async rejectUser(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    user.status = 'rejected';
    return user.save();
  }

 async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id).select('-password').lean();

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'User fetched successfully',
        statusCode: HttpStatus.OK,
        user,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'An error occurred while fetching the user',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }







  
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  findAll() {
    return `This action returns all user`;
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
