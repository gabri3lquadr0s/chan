import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsNotEmpty,
    IsString,
    IsArray,
  } from 'class-validator';

export class CreateThreadDto {
    @ApiProperty({type: String, description: "Thread creator", example: "Anom"})
    @IsString()
    @IsNotEmpty()
    creator: string;

    @ApiProperty({type: String, description: "Thread subject", example: "Hi chan!"})
    @IsString()
    @IsNotEmpty()
    subject: string;

    @ApiProperty({type: String, description: "Thread comment", example: "Hi chan, I'm new here!"})
    @IsString()
    @IsNotEmpty()
    comment: string;

    @ApiProperty({type: String, description: "Thread tags", example: ["new", "newuser", "hi"]})
    @IsArray()
    @IsNotEmpty()
    tags: string;

    @ApiProperty({type: Boolean, description: "Thread contains spoiler", example: false})
    @IsBoolean()
    @IsNotEmpty()
    isSpoiler: boolean;

    @ApiProperty({type: Boolean, description: "Thread contains NSFW content", example: false})
    @IsBoolean()
    @IsNotEmpty()
    isNsfw: boolean;
}
