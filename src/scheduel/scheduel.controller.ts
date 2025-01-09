import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SchedulesService } from './scheduel.service';
import { Schedule } from './entities/scheduel.entity';
import { CreateScheduelDto } from './dto/create-scheduel.dto';
import { UpdateScheduelDto } from './dto/update-scheduel.dto';

@Controller('api/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  async create(@Body() createScheduleDto:CreateScheduelDto): Promise<Schedule> {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  async findAll(): Promise<Schedule[]> {
    return this.schedulesService.findAll();
  }

  @Get(':adId')
  async findOne(@Param('adId') adId: string): Promise<Schedule> {
    return this.schedulesService.findOne(adId);
  }

  @Put(':adId')
  async update(@Param('adId') adId: string, @Body() updateScheduleDto: UpdateScheduelDto): Promise<Schedule> {
    return this.schedulesService.update(adId, updateScheduleDto);
  }

  @Delete(':adId')
  async delete(@Param('adId') adId: string): Promise<Schedule> {
    return this.schedulesService.delete(adId);
  }
}