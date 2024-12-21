import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CompleteVenueOwnerProfileDto {
  @ApiProperty({
    description: 'The name of the venue',
    example: 'Sports Bar & Grill',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  venueName: string;

  @ApiProperty({
    description: 'The type/category of the venue',
    example: 'Sports Bar',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  venueType: string;

  @ApiProperty({
    description: 'Business license number of the venue',
    example: 'LIC123456789',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  licenseNumber: string;

  @ApiProperty({
    description: 'Physical address of the venue',
    example: '123 Tech Street, Silicon Valley, CA 94025',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Number of TVs available in the venue',
    example: 5,
    required: true,
    minimum: 1
  })
  @IsNotEmpty()
  @IsNumber()
  numberOfTVs: number;
}
