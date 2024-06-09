import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
export declare class ThreadsController {
    private readonly threadsService;
    constructor(threadsService: ThreadsService);
    create(createThreadDto: CreateThreadDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateThreadDto: UpdateThreadDto): string;
    remove(id: string): string;
}
