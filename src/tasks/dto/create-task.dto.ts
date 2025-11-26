import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy milk', description: 'Title of the task' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'Buy milk', description: 'Description of the task' })
  @IsString()
  @MaxLength(500)
  description: string;
}
