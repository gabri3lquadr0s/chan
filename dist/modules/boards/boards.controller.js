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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const boards_service_1 = require("./boards.service");
const create_board_dto_1 = require("./dto/create-board.dto");
const update_board_dto_1 = require("./dto/update-board.dto");
const swagger_1 = require("@nestjs/swagger");
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    async createBoard(createBoardDto) {
        return this.boardsService.createBoard(createBoardDto);
    }
    async getAllBoards(page) {
        return this.boardsService.getAllBoards(page);
    }
    async getBoardById(id) {
        return this.boardsService.getBoardById(+id);
    }
    async getBoardsByName(name, page) {
        return this.boardsService.getBoardsByName(name, page);
    }
    async getBoardsByCategory(page, category) {
        return this.boardsService.getBoardsByCategory(category, page);
    }
    async updateBoard(id, updateBoardDto) {
        return this.boardsService.updateBoard(+id, updateBoardDto);
    }
    async deleteBoard(id) {
        return this.boardsService.deleteBoard(+id);
    }
};
exports.BoardsController = BoardsController;
__decorate([
    (0, common_1.Post)('/createBoard'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Board created', type: create_board_dto_1.CreateBoardDto, status: 201 }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request', status: 400 }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Board already exists', status: 409 }),
    (0, swagger_1.ApiOperation)({ summary: 'Creates a board' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "createBoard", null);
__decorate([
    (0, common_1.Get)('/getAllBoards/:page'),
    (0, swagger_1.ApiOkResponse)({ description: 'Success', status: 201 }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request', status: 400 }),
    (0, swagger_1.ApiParam)({ name: 'page', schema: { default: 1 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Returns all boards by page' }),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getAllBoards", null);
__decorate([
    (0, common_1.Get)('/getBoardById/:id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Success', status: 201 }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request', status: 400 }),
    (0, swagger_1.ApiParam)({ name: 'page', schema: { default: 1 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Returns board by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getBoardById", null);
__decorate([
    (0, common_1.Get)('/getBoardByName/:name/:page'),
    (0, swagger_1.ApiOkResponse)({ description: 'Success', status: 201 }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request', status: 400 }),
    (0, swagger_1.ApiParam)({ name: 'page', schema: { default: 1 } }),
    (0, swagger_1.ApiParam)({ name: 'name', schema: { default: "board" } }),
    (0, swagger_1.ApiOperation)({ summary: 'Returns boards by name' }),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getBoardsByName", null);
__decorate([
    (0, common_1.Post)('/getBoardsByCategory/:page'),
    (0, swagger_1.ApiOkResponse)({ description: 'Success', status: 201 }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request', status: 400 }),
    (0, swagger_1.ApiParam)({ name: 'page', schema: { default: 1 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Returns boards by category' }),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getBoardsByCategory", null);
__decorate([
    (0, common_1.Patch)('/updateBoard/:id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Success', type: update_board_dto_1.UpdateBoardDto, status: 201 }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request', status: 400 }),
    (0, swagger_1.ApiParam)({ name: 'page', schema: { default: 1 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Update board by id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_board_dto_1.UpdateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "updateBoard", null);
__decorate([
    (0, common_1.Delete)('/deleteBoard/:id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Success', type: update_board_dto_1.UpdateBoardDto, status: 201 }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request', status: 400 }),
    (0, swagger_1.ApiParam)({ name: 'page', schema: { default: 1 } }),
    (0, swagger_1.ApiOperation)({ summary: 'Delete board by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "deleteBoard", null);
exports.BoardsController = BoardsController = __decorate([
    (0, common_1.Controller)('boards'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Boards'),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map