"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('API - Chan')
        .setDescription('APIs Chan')
        .addTag('Users', 'User actions')
        .addTag('Categories', 'Category actions')
        .addTag('Boards', 'Board actions')
        .addTag('Threads', 'Thread actions')
        .addTag('Replies', 'Reply actions')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map