import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CompleteAdvertiserProfileDto {
  @ApiProperty({
    default:"Electronics"
  })
  @IsNotEmpty()
  @IsString()
  companyName: string;


  @ApiProperty({
    default:"Tech Solutions"
  })
  @IsNotEmpty()
  @IsString()
  businessType: string;


  @ApiProperty({
    default:"123456789"
  })
  @IsNotEmpty()
  @IsString()
  licenseNumber: string;


  @ApiProperty({
    default:'123 Tech Street, Silicon Valley, USA'
  })
  @IsNotEmpty()
  @IsString()
  location: string;
}
