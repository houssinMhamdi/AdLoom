import { ApiProperty } from "@nestjs/swagger";

export class CreateScheduelDto {
    @ApiProperty({
        example: '64c9e4e4e4b0f5b5f0f5b5f0',
        description: 'The ID of the associated advertising',
      })
      adId: string;
    
      @ApiProperty({
        example: '2025-01-03T12:00:00Z',
        description: 'The date and time of the schedule',
      })
      date: Date;
    
      @ApiProperty({
        example: 60,
        description: 'The duration of the schedule in minutes',
      })
      duration: number;
}
