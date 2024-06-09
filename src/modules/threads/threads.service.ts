import { ConflictException, Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class ThreadsService {
  constructor(private prisma: PrismaService) {}
  
  async createThread(board: number, createThreadDto: CreateThreadDto, file) {
    return this.prisma.thread.create({
      data: {
        ...createThreadDto,
        board,
        isArchived: false,
        file,
      },
    });
  }

  async getAllThreadsFromBoard(board: number, page: number) {
    const boardExist = await this.prisma.board.findUnique({
      where: {
        id: board,
      },
    });
    if(!boardExist) throw new ConflictException("Board not found");

    let res;
    let count = await this.prisma.thread.count({where: {board}});
    
    if(page == 0) {
      res = await this.prisma.thread.findMany({
        where: {
          board,
        },
      });
    }
    else if(page == 1) {
      res = await this.prisma.thread.findMany({
        take: 20,
        where: {
          board,
        },
      });
    }
    else {
      res = await this.prisma.thread.findMany({
        take: 20,
        where: {
          board,
        },
        skip: (page-1) * 20,
      });
    }

    return {"response": res, "totalCount": count};
  }

  async getThreadById(id: number) {
    const thread = await this.prisma.thread.findUnique({
      where: {
        id,
      },
    });

    if(!thread) throw new ConflictException("Thread does not exist");

    return thread;
  }

  async getThreadBySubjects(board: number, subject: string, page: number) {
    let res;
    let count = await this.prisma.thread.count({where: {board, OR: [{subject: {contains: subject, mode: 'insensitive'}}]}});
    if(count == 0) throw new ConflictException("Thread does not exist");
    
    if(page == 0) {
      res = await this.prisma.thread.findMany({
        where: {
          board,
          OR: [{
            subject: {contains: subject, mode: 'insensitive'},
          }],
        },
      });
    }
    else if(page == 1) {
      res = await this.prisma.thread.findMany({
        where: {
          board,
          OR: [{
            subject: {contains: subject, mode: 'insensitive'},
          }],
        },
        take: 20,
      });
    }
    else {
      res = await this.prisma.thread.findMany({
        where: {
          board,
          OR: [{
            subject: {contains: subject, mode: 'insensitive'},
          }],
        },
        take: 20,
        skip: (page-1) * 20,
      });
    }

    return {"response": res, "totalCount": count};
  }

  async getThreadByTags(tags: string[], page: number, board: number) {
    let res;
    let count = await this.prisma.thread.count({where:{tags:{hasEvery:tags}, board}});
    if(count == 0) throw new ConflictException("Thread does not exist");

    if(page == 0) {
      res = await this.prisma.thread.findMany({
        where: {
          tags: {
            hasEvery: tags,
          },
          board,
        },
      });
    }
    else if(page == 1) {
      res = await this.prisma.thread.findMany({
        where: {
          tags: {
            hasEvery: tags,
          },
          board,
        },
        take: 20,
      });
    }
    else {
      res = await this.prisma.thread.findMany({
        where: {
          tags: {
            hasEvery: tags,
          },
          board,
        },
        take: 20,
        skip: (page-1) * 20,
      });
    }

    return {"response": res, "totalCount": count};

  }

  async getThreadByDate(date: Date, board: number, page: number) {
    let res;
    let count = await this.prisma.thread.count({where: {createDate: date, board}});
    if(count == 0) throw new ConflictException("Thread does not exist");

    if(page == 0) {
      res = await this.prisma.thread.findMany({
        where: {
          board,
          createDate: date,
        },
      });
    }
    else if(page == 1) {
      res = await this.prisma.thread.findMany({
        where: {
          board,
          createDate: date,
        },
        take: 20,
      });
    }
    else {
      res = await this.prisma.thread.findMany({
        where: {
          board,
          createDate: date,
        },
        take: 20,
        skip: (page-1) * 20,
      });
    }

    return {"response": res, "totalCount": count};
  }

  async getArchivedThreads(board: number, page: number) {
    let res;
    let count = await this.prisma.thread.count({where: {isArchived: true, board}});
    if(count == 0) throw new ConflictException("Thread does not exist");

    if(page == 0) {
      res = await this.prisma.thread.findMany({
        where: {
          board,
          isArchived: true,
        },
      });
    }
    else if(page == 1) {
      res = await this.prisma.thread.findMany({
        where: {
          board,
          isArchived: true,
        },
        take: 20,
      });
    }
    else {
      res = await this.prisma.thread.findMany({
        where: {
          board,
          isArchived: true,
        },
        take: 20,
        skip: (page-1) * 20,
      });
    }

    return {"response": res, "totalCount": count};
  }

  async removeThread(id: number) {
    const thread = await this.prisma.thread.findUnique({
      where: {
        id,
      },
    });

    if(!thread) throw new ConflictException("Thread not found");

    return this.prisma.thread.delete({
      where: {
        id,
      },
    });
  }
}
