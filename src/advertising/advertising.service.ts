import { Injectable } from '@nestjs/common';
import { CreateAdvertisingDto } from './dto/create-advertising.dto';
import { UpdateAdvertisingDto } from './dto/update-advertising.dto';
import { Model } from 'mongoose';
import { Advertising } from './entities/advertising.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';

@Injectable()
export class AdvertisingService {
  constructor(
    @InjectModel(Advertising.name)
    private readonly adsModel: Model<Advertising>,
  ) {}

async create(item: CreateAdvertisingDto): Promise<Advertising> {
    if (!item.title || !item.description) {
      throw new Error('Required fields are missing');
    }
    const newItem = new this.adsModel(item);
    return newItem.save();
  }

async findAll(): Promise<Advertising[]> {
    return this.adsModel.find().exec();
  }

findOne(id: string) {
    return this.adsModel.findById(id);
  }

  async update(id: string, item: Partial<Advertising>) {
    const existingItem = await this.adsModel.findById(id).exec();
    if (!existingItem) {
      throw new Error('image not found');
    }
    if (item.filePath && existingItem.filePath) {
      fs.unlinkSync(existingItem.filePath);
    }

    // Check if targetAudience exists in the updated item and compare with the existing one
    if (item.targetAudience) {
      const existingTargetAudience = existingItem.targetAudience || {};

      // Only update location and capacity if they are provided
      existingTargetAudience.location =
        item.targetAudience.location || existingTargetAudience.location;
      existingTargetAudience.capacity =
        item.targetAudience.capacity || existingTargetAudience.capacity;

      // Replace the existing targetAudience with the updated one
      item.targetAudience = existingTargetAudience;
    }

    return this.adsModel.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  async remove(id: string) {
    const existingItem = await this.adsModel.findById(id).exec();
    if (!existingItem) {
      throw new Error('image not found');
    }
    if (existingItem.filePath && existingItem.filePath) {
      fs.unlinkSync(existingItem.filePath);
    }
  }
}
