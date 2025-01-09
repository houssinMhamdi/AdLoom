import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdAdminAssinmentService } from './ad-admin-assinment.service';
import { CreateAdAdminAssinmentDto } from './dto/create-ad-admin-assinment.dto';
import { UpdateAdAdminAssinmentDto } from './dto/update-ad-admin-assinment.dto';
import { Roles } from 'src/auth/guard/roles.decorator';
import { UerRole } from 'src/user/Enums/Roles';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('ad-admin-assinment')
export class AdAdminAssinmentController {
  constructor(private readonly adAdminAssinmentService: AdAdminAssinmentService) {}

  @Roles(UerRole.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdAdminAssinmentDto: CreateAdAdminAssinmentDto) {
    return this.adAdminAssinmentService.create(createAdAdminAssinmentDto);
  }

  @Get()
  findAll() {
    return this.adAdminAssinmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.adAdminAssinmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdAdminAssinmentDto: UpdateAdAdminAssinmentDto) {
    return this.adAdminAssinmentService.update(+id, updateAdAdminAssinmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adAdminAssinmentService.remove(+id);
  }
}
