import { PartialType } from '@nestjs/swagger';
import { CreateScheduelDto } from './create-scheduel.dto';

export class UpdateScheduelDto extends PartialType(CreateScheduelDto) {}
