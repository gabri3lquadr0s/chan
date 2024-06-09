import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/db/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async createBoard(createBoardDto: CreateBoardDto, createdBy: number) {
    const { name } = createBoardDto;
    const nameExists = await this.prisma.board.findFirst({
      where: {
        name
      },
    });
    if(nameExists) throw new ConflictException("Board name already exists");

    return this.prisma.board.create({
      data: {
        ...createBoardDto,
        createdBy,
      },
    });

  }

  async getAllBoards(page: number) {
    let res;
    let count = await this.prisma.board.count();

    if(page == 0) {
      res = await this.prisma.board.findMany();
    } 

    else if(page == 1) {
      res = await this.prisma.board.findMany({take: 20});
    } 
    
    else {
      res = await this.prisma.board.findMany({take: 20, skip: (page - 1) * 20});
    }

    return {"response": res, "totalCount": count};
  }

  async getBoardById(id: number) {
    const board = await this.prisma.board.findUnique({
      where: {
        id
      }
    });
    if(!board) throw new NotFoundException("Board not found");
    return board;
  }

  async getBoardsByName(name: string, page: number) {
    let res;
    let count = await this.prisma.board.count({where:{OR:[{name: {contains: name, mode: 'insensitive'}}]}});
    
    if(page == 0) {
      res = await this.prisma.board.findMany({
        where: {
          OR: [{
            name: {contains: name, mode: 'insensitive'},
            },
          ],
        },
      });
    } 

    else if(page == 1) {
      res = await this.prisma.board.findMany({
        take: 20,
        where: {
          OR: [{
            name: {contains: name, mode: 'insensitive'},
            },
          ],
        },
      });
    } 
    
    else {
      res = await this.prisma.board.findMany({
        take: 20,
        where: {
          OR: [{
            name: 
              {contains: name, mode: 'insensitive'},
            },
          ],
        },
        skip: (page - 1) * 20
      });
    }

    return {"response": res, "totalCount": count};
  }

  async getBoardsByCategory(category: Category[], page: number) {
    let res;
    let count = await this.prisma.board.count({where:{category:{hasEvery:category}}});

    if(page == 0) {
      res = await this.prisma.board.findMany({
        where: {
          category: {
            hasEvery: category,
          },
        },
      });
    }

    else if(page == 1) {
      res = await this.prisma.board.findMany({
        take: 20,
        where: {
          category: {
            hasEvery: category,
          },
        },
      });
    }

    else  {
      res = await this.prisma.board.findMany({
        take: 20,
        where: {
          category: {
            hasEvery: category,
          },
        },
        skip: (page - 1) * 20
      });
    }

    return {"response": res, "totalCount": count};
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto, user: number) {
    const board = await this.prisma.board.findUnique({
      where: {
        id,
      }
    });

    if(user != 0) {
      if(user != board.createdBy) {
        throw new UnauthorizedException();
      }
    }

    if(!board) throw new NotFoundException("ERROR: Ong não encontrada");

    return this.prisma.board.update({
      data: {
        ...updateBoardDto,
      },
      where: {
        id,
      }
    });
  }

  async deleteBoard(id: number, user: number) {
    const board = await this.prisma.board.findUnique({
      where: {
        id,
      },
    });

    if(user != 0) {
      if(user != board.createdBy) {
        throw new UnauthorizedException();
      }
    }

    if(!board) throw new NotFoundException("Board not found");

    return this.prisma.board.delete({
      where: {
        id,
      },
    });
  }
}
