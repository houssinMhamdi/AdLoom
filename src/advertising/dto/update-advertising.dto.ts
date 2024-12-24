import { PartialType } from '@nestjs/swagger';
import { CreateAdvertisingDto } from './create-advertising.dto';

export class UpdateAdvertisingDto extends PartialType(CreateAdvertisingDto) {}
