import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TargetAudienceDto {
  @ApiPropertyOptional({ description: 'Location of the target audience', example: 'New York' })
  location?: string;

  @ApiPropertyOptional({ description: 'Capacity of the target audience', example: 100 })
  capacity?: number;
}

export class CreateAdvertisingDto {
  @ApiProperty({ description: 'Title of the advertisement', example: 'New Product Launch' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the advertisement', example: 'Details about the new product.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: TargetAudienceDto, description: 'Details of the target audience' })
  @ValidateNested()
  @Type(() => TargetAudienceDto)
  targetAudience?: TargetAudienceDto;

  @ApiPropertyOptional({ description: 'File path of the uploaded file', example: '/uploads/file.jpg' })
  filePath?: string;

  @ApiPropertyOptional({ description: 'File type of the uploaded file', example: 'image/jpeg' })
  fileType?: string;
}
