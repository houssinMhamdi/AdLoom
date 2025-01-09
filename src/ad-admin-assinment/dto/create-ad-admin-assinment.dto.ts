import { ApiProperty } from "@nestjs/swagger";

export class CreateAdAdminAssinmentDto {

  @ApiProperty({ example: 'user_id_1', description: 'User ID' })
  user_id: string;

  @ApiProperty({ example: 'ad_id_1', description: 'Ad ID' })
  ad_id: string;

  @ApiProperty({ example: 1, description: 'Device ID' })
  device_id: number;

  @ApiProperty({ example: 'admin_id_1', description: 'Admin ID who assigned the ad' })
  assigned_by: string;

}
