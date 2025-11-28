import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialDto {
  @ApiProperty({
    example: 'user1@gmail.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
