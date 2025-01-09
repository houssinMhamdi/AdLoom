import { PartialType } from '@nestjs/swagger';
import { CreateAdAdminAssinmentDto } from './create-ad-admin-assinment.dto';

export class UpdateAdAdminAssinmentDto extends PartialType(CreateAdAdminAssinmentDto) {}
