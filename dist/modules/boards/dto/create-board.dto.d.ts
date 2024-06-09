import { Category } from '@prisma/client';
export declare class CreateBoardDto {
    name: string;
    abreviation: string;
    description: string;
    category: Category[];
    allowsNsfw: boolean;
}
