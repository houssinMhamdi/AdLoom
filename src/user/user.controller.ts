import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  BadRequestException,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

import { CompleteAdvertiserProfileDto } from './dto/complete-advertiser-profile.dto';
import { CompleteVenueOwnerProfileDto } from './dto/complete-VenueOwner-profile.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Role } from 'src/auth/guard/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete user profile', description: 'Complete either advertiser or venue owner profile based on user role' })
  @ApiBody({
    schema: {
      oneOf: [
        {
          title: 'AdvertiserProfile',
          description: 'Complete advertiser profile',
          properties: {
            companyName: { type: 'string', example: 'Tech Corp' },
            businessType: { type: 'string', example: 'Technology' },
            registrationNumber: { type: 'string', example: 'REG123456' },
            contactPerson: { type: 'string', example: 'John Doe' },
            contactEmail: { type: 'string', example: 'john@techcorp.com' }
          },
          required: ['companyName', 'businessType', 'registrationNumber', 'contactPerson', 'contactEmail']
        },
        {
          title: 'VenueOwnerProfile',
          description: 'Complete venue owner profile',
          properties: {
            venueName: { type: 'string', example: 'Sports Bar & Grill' },
            venueType: { type: 'string', example: 'Sports Bar' },
            licenseNumber: { type: 'string', example: 'LIC123456789' },
            location: { type: 'string', example: '123 Tech Street, Silicon Valley, CA 94025' },
            numberOfTVs: { type: 'number', example: 5 }
          },
          required: ['venueName', 'venueType', 'licenseNumber', 'location', 'numberOfTVs']
        }
      ]
    }
  })
  @UseGuards(JwtAuthGuard)
  @Put('/user/complete')
  async completeProfile(
    @Request() req,
    @Body() dto: CompleteAdvertiserProfileDto | CompleteVenueOwnerProfileDto,
  ) {
    const user = req.user;

    if (!user) {
      throw new BadRequestException('User not authenticated');
    }

    if (user.role === 'advertiser') {
      return this.userService.completeProfile(
        user.userId,
        dto as CompleteAdvertiserProfileDto,
      );
    } else if (user.role === 'venueOwner') {
      return this.userService.completeProfile(
        user.userId,
        dto as CompleteVenueOwnerProfileDto,
      );
    } else {
      throw new BadRequestException('Invalid user role');
    }
  }



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Get('/admin/pending-users')
  async getPendingUsers(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
  ) {
    return this.userService.getpendingUsers(limit, skip);
  }



  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Patch('/admin/approve/:userId')
  async approveUser(@Param('userId') userId: string) {
    return this.userService.approveUser(userId);
  }


  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Patch('/admin/reject/:userId')
  async rejectUser(@Param('userId') userId: string) {
    return this.userService.rejectUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/profile/:userId')
  async getProfileData(@Request() req, @Param('userId') userId: string) {
    if (req.user.userId !== userId && req.user.role !== 'admin') {
      throw new BadRequestException(
        'You are not authorized to access this profile',
      );
    }
    return this.userService.findOne(userId);
  }
}
