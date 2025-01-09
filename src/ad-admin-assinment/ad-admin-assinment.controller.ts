import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdAdminAssinmentService } from './ad-admin-assinment.service';
import { CreateAdAdminAssinmentDto } from './dto/create-ad-admin-assinment.dto';
import { UpdateAdAdminAssinmentDto } from './dto/update-ad-admin-assinment.dto';
import { Roles } from 'src/auth/guard/roles.decorator';
import { UerRole } from 'src/user/Enums/Roles';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
@Roles(UerRole.Admin)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('ad-admin-assinment')
export class AdAdminAssinmentController {
  constructor(
    private readonly adAdminAssinmentService: AdAdminAssinmentService,
  ) {}

  @Post()
  create(@Body() createAdAdminAssinmentDto: CreateAdAdminAssinmentDto) {
    return this.adAdminAssinmentService.create(createAdAdminAssinmentDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all ad assignments' })
  @ApiResponse({ status: 200, description: 'List of all ad assignments.' })
  findAll() {
    return this.adAdminAssinmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ad assignment by ID' })
  @ApiParam({ name: 'id', description: 'Ad assignment ID' })
  @ApiResponse({ status: 200, description: 'Ad assignment found.' })
  @ApiResponse({ status: 404, description: 'Ad assignment not found.' })
  findOne(@Param('id') id: string) {
    return this.adAdminAssinmentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an ad assignment by ID' })
  @ApiParam({ name: 'id', description: 'Ad assignment ID' })
  @ApiResponse({ status: 200, description: 'Ad assignment updated successfully.' })
  @ApiResponse({ status: 404, description: 'Ad assignment not found.' })
  update(
    @Param('id') id: string,
    @Body() updateAdAdminAssinmentDto: UpdateAdAdminAssinmentDto,
  ) {
    return this.adAdminAssinmentService.update(id, updateAdAdminAssinmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an ad assignment by ID' })
  @ApiParam({ name: 'id', description: 'Ad assignment ID' })
  @ApiResponse({ status: 200, description: 'Ad assignment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Ad assignment not found.' })
  remove(@Param('id') id: string) {
    return this.adAdminAssinmentService.remove(id);
  }
}
