import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Put,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';

import { AdvertisingService } from './advertising.service';
import { CreateAdvertisingDto } from './dto/create-advertising.dto';
import { UpdateAdvertisingDto } from './dto/update-advertising.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Advertising } from './entities/advertising.entity';
import { deleteFile, editFileName, handelfileFilter } from './utils/file.utils';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UerRole } from 'src/user/Enums/Roles';
import { Roles } from 'src/auth/guard/roles.decorator';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Schedule } from 'src/scheduel/entities/scheduel.entity';

@ApiTags('Advertising')
@Controller('api/advertising')
export class AdvertisingController {
  constructor(private readonly advertisingService: AdvertisingService) {}


  @ApiOperation({ summary: 'Create a new advertisement' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Advertising Request',
    type: CreateAdvertisingDto,
  })
  @Roles(UerRole.Admin, UerRole.Advertiser)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: handelfileFilter,
    }),
  )
  async create(
    @Body()
    body: CreateAdvertisingDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<Advertising> {
    try {
      const filePath = file ? file.path : null;
      const fileType = file ? file.mimetype : null;
      return this.advertisingService.create({
        ...body,
        filePath,
        fileType,
        createdBy: req.user.id,
      });
    } catch (error) {
      if (file?.path) {
        deleteFile(file.path);
      }
      throw error;
    }
  }
  @ApiOperation({ summary: 'Retrieve all advertisements (Admin only)' })
  @Roles(UerRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.advertisingService.findAll();
  }
  @ApiOperation({ summary: 'Retrieve a single advertisement by ID' })
  @ApiParam({ name: 'id', description: 'ID of the advertisement', example: '12345' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertisingService.findOne(id);
  }
  @Roles(UerRole.Admin, UerRole.Advertiser)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: handelfileFilter,
    }),
  )

  @ApiOperation({ summary: 'Update an advertisement' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'ID of the advertisement to update', example: '12345' })
  @ApiBody({
    description: 'Update Advertising Request',
    type: UpdateAdvertisingDto,
  })
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body()
    body: {
      title?: string;
      description?: string;
      targetAudience?: {
        location: string;
        capacity: number;
      };
    },
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Advertising> {
    const filePath = file ? file.path : undefined;
    const fileType = file ? file.mimetype : undefined;

    const userId = req.user.id; 
    const userRole = req.user.role;
    const isAllowed = await this.advertisingService.canUpdateAd(
      id,
      userId,
      userRole,
    );
    if (!isAllowed) {
      throw new ForbiddenException(
        'You do not have permission to update this ad.',
      );
    }
    return this.advertisingService.update(id, {
      ...body,
      ...(filePath && { filePath, fileType }),
    });
  }

  @ApiOperation({ summary: 'Delete an advertisement' })
  @ApiParam({ name: 'id', description: 'ID of the advertisement to delete', example: '12345' })
  @Roles(UerRole.Admin, UerRole.Advertiser)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertisingService.remove(id);
  }

  @Post('schedules')
  async addSchedule(@Body() createScheduleDto: Partial<Schedule>): Promise<Advertising> {
    return this.advertisingService.addSchedule( createScheduleDto);
  }

  @Put(':advertisingId/schedules/:scheduleId')
  async updateSchedule(
    @Param('advertisingId') advertisingId: string,
    @Param('scheduleId') scheduleId: string,
    @Body() updateScheduleDto: Partial<Schedule>,
  ): Promise<Schedule> {
    return this.advertisingService.updateSchedule(scheduleId, updateScheduleDto);
  }

  @Delete(':advertisingId/schedules/:scheduleId')
  async deleteSchedule(
    @Param('advertisingId') advertisingId: string,
    @Param('scheduleId') scheduleId: string,
  ): Promise<Advertising> {
    return this.advertisingService.deleteSchedule(advertisingId, scheduleId);
  }
}
