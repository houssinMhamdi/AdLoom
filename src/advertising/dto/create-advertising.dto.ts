import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TargetAudienceDto {
  location?: string;
  capacity?: number;
}

export class CreateAdvertisingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => TargetAudienceDto)
  targetAudience?: TargetAudienceDto;
  

  filePath?: string;
  fileType?: string;
}