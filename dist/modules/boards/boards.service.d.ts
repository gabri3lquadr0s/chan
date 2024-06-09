import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Category } from '@prisma/client';
export declare class BoardsService {
    private prisma;
    constructor(prisma: PrismaService);
    createBoard(createBoardDto: CreateBoardDto): Promise<{
        id: number;
        name: string;
        abreviation: string;
        description: string;
        category: import(".prisma/client").$Enums.Category[];
        allowsNsfw: boolean;
    }>;
    getAllBoards(page: number): Promise<{
        response: any;
        totalCount: number;
    }>;
    getBoardById(id: number): Promise<{
        id: number;
        name: string;
        abreviation: string;
        description: string;
        category: import(".prisma/client").$Enums.Category[];
        allowsNsfw: boolean;
    }>;
    getBoardsByName(name: string, page: number): Promise<{
        response: any;
        totalCount: number;
    }>;
    getBoardsByCategory(category: Category[], page: number): Promise<{
        response: any;
        totalCount: number;
    }>;
    updateBoard(id: number, updateBoardDto: UpdateBoardDto): Promise<{
        id: number;
        name: string;
        abreviation: string;
        description: string;
        category: import(".prisma/client").$Enums.Category[];
        allowsNsfw: boolean;
    }>;
    deleteBoard(id: number): Promise<{
        id: number;
        name: string;
        abreviation: string;
        description: string;
        category: import(".prisma/client").$Enums.Category[];
        allowsNsfw: boolean;
    }>;
}
