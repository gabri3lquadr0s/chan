import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsArray
} from 'class-validator';

export class CreateBoardDto {
    @ApiProperty({type: String, description: "Name of the board", example: "Random"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({type: String, description: "Abreviation of the board", example: "r"})
    @IsString()
    @IsNotEmpty()
    abreviation: string;

    @ApiProperty({type: String, description: "Description of the board", example: "This is a random board"})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({type: String, description: "Categories that the board fits", example: ["chat", "anime"]})
    @IsArray()
    @IsNotEmpty()
    category: Category[];

    @ApiProperty({type: String, description: "If the board allows nsfw content or not", example: false})
    @IsBoolean()
    @IsNotEmpty()
    allowsNsfw: boolean;

}
