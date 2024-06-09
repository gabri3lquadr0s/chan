import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogDto {
    @ApiProperty({ type: String, description: 'User email' })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @ApiProperty({ type: String, description: 'User password' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
