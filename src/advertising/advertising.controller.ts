import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import * as fs from 'fs';
import { AdvertisingService } from './advertising.service';
import { CreateAdvertisingDto } from './dto/create-advertising.dto';
import { UpdateAdvertisingDto } from './dto/update-advertising.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Advertising } from './entities/advertising.entity';
import { deleteFile } from './utils/file.utils';

@Controller('api/advertising')
export class AdvertisingController {
  constructor(private readonly advertisingService: AdvertisingService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'video/mp4',
          'video/mkv',
        ];
        if (allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  async create(
    @Body()
    body: CreateAdvertisingDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Advertising> {
    try {
      const filePath = file ? file.path : null;
      const fileType = file ? file.mimetype : null;
      return this.advertisingService.create({ ...body, filePath, fileType });
    } catch (error) {
      if (file?.path) {
        deleteFile(file.path);
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.advertisingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertisingService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'video/mp4',
          'video/mkv',
        ];
        if (allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    }),
  )
  async update(
    @Param('id') id: string,
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
    return this.advertisingService.update(id, {
      ...body,
      ...(filePath && { filePath, fileType }),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertisingService.remove(id);
  }
}
