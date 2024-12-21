import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role, Status, ProfileStatus } from '../Enums/Roles';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'A valid email address is required.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required.' })
  phoneNumber: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'First name is required.' })
  firstName: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Last name is required.' })
  lastName: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;



  @ApiProperty({
    enum:Role,
    default:"advertiser",
    description:"Role must be either advertiser or venueOwner"

  })
  @IsEnum(Role, {
    message: 'Role must be either "advertiser" or "venueOwner".',
  })
  @IsNotEmpty({ message: 'Role is required.' })
  role: Role;

  @ApiProperty({
    enum:Status
  })
  @IsEnum(Status)
  status?: Status = Status.Incomplete;


  @ApiProperty({
    enum:ProfileStatus
  })
  @IsEnum(ProfileStatus)
  profileStatus?: ProfileStatus = ProfileStatus.Pending;
}
