"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma.service");
let BoardsService = class BoardsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBoard(createBoardDto) {
        const { name } = createBoardDto;
        const nameExists = await this.prisma.board.findFirst({
            where: {
                name
            },
        });
        if (nameExists)
            throw new common_1.ConflictException("Board name already exists");
        return this.prisma.board.create({
            data: {
                ...createBoardDto,
            },
        });
    }
    async getAllBoards(page) {
        let res;
        let count = await this.prisma.board.count();
        if (page == 0) {
            res = await this.prisma.board.findMany();
        }
        else if (page == 1) {
            res = await this.prisma.board.findMany({ take: 20 });
        }
        else {
            res = await this.prisma.board.findMany({ take: 20, skip: (page - 1) * 20 });
        }
        return { "response": res, "totalCount": count };
    }
    async getBoardById(id) {
        const board = await this.prisma.board.findUnique({
            where: {
                id
            }
        });
        if (!board)
            throw new common_1.NotFoundException("Board not found");
        return board;
    }
    async getBoardsByName(name, page) {
        let res;
        let count = await this.prisma.board.count({ where: { OR: [{ name: { contains: name, mode: 'insensitive' } }] } });
        if (page == 0) {
            res = await this.prisma.board.findMany({
                where: {
                    OR: [{
                            name: { contains: name, mode: 'insensitive' },
                        },
                    ],
                },
            });
        }
        else if (page == 1) {
            res = await this.prisma.board.findMany({
                take: 20,
                where: {
                    OR: [{
                            name: { contains: name, mode: 'insensitive' },
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
                            name: { contains: name, mode: 'insensitive' },
                        },
                    ],
                },
                skip: (page - 1) * 20
            });
        }
        return { "response": res, "totalCount": count };
    }
    async getBoardsByCategory(category, page) {
        let res;
        let count = await this.prisma.board.count({ where: { category: { hasEvery: category } } });
        if (page == 0) {
            res = await this.prisma.board.findMany({
                where: {
                    category: {
                        hasEvery: category,
                    },
                },
            });
        }
        else if (page == 1) {
            res = await this.prisma.board.findMany({
                take: 20,
                where: {
                    category: {
                        hasEvery: category,
                    },
                },
            });
        }
        else {
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
        return { "response": res, "totalCount": count };
    }
    async updateBoard(id, updateBoardDto) {
        const board = await this.prisma.board.findUnique({
            where: {
                id,
            }
        });
        if (!board)
            throw new common_1.NotFoundException("ERROR: Ong não encontrada");
        return this.prisma.board.update({
            data: {
                ...updateBoardDto,
            },
            where: {
                id,
            }
        });
    }
    async deleteBoard(id) {
        const board = await this.prisma.board.findUnique({
            where: {
                id
            },
        });
        if (!board)
            throw new common_1.NotFoundException("Board not found");
        return this.prisma.board.delete({
            where: {
                id
            },
        });
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BoardsService);
//# sourceMappingURL=boards.service.js.map