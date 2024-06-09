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
exports.RepliesController = void 0;
const common_1 = require("@nestjs/common");
const replies_service_1 = require("./replies.service");
const create_reply_dto_1 = require("./dto/create-reply.dto");
const update_reply_dto_1 = require("./dto/update-reply.dto");
let RepliesController = class RepliesController {
    constructor(repliesService) {
        this.repliesService = repliesService;
    }
    create(createReplyDto) {
        return this.repliesService.create(createReplyDto);
    }
    findAll() {
        return this.repliesService.findAll();
    }
    findOne(id) {
        return this.repliesService.findOne(+id);
    }
    update(id, updateReplyDto) {
        return this.repliesService.update(+id, updateReplyDto);
    }
    remove(id) {
        return this.repliesService.remove(+id);
    }
};
exports.RepliesController = RepliesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reply_dto_1.CreateReplyDto]),
    __metadata("design:returntype", void 0)
], RepliesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RepliesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepliesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_reply_dto_1.UpdateReplyDto]),
    __metadata("design:returntype", void 0)
], RepliesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RepliesController.prototype, "remove", null);
exports.RepliesController = RepliesController = __decorate([
    (0, common_1.Controller)('replies'),
    __metadata("design:paramtypes", [replies_service_1.RepliesService])
], RepliesController);
//# sourceMappingURL=replies.controller.js.map