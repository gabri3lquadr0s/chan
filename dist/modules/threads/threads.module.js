"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsModule = void 0;
const common_1 = require("@nestjs/common");
const threads_service_1 = require("./threads.service");
const threads_controller_1 = require("./threads.controller");
const prisma_service_1 = require("../../db/prisma.service");
let ThreadsModule = class ThreadsModule {
};
exports.ThreadsModule = ThreadsModule;
exports.ThreadsModule = ThreadsModule = __decorate([
    (0, common_1.Module)({
        controllers: [threads_controller_1.ThreadsController],
        providers: [threads_service_1.ThreadsService, prisma_service_1.PrismaService],
        exports: [threads_service_1.ThreadsService],
    })
], ThreadsModule);
//# sourceMappingURL=threads.module.js.map