import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
export declare class ThreadsService {
    create(createThreadDto: CreateThreadDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateThreadDto: UpdateThreadDto): string;
    remove(id: number): string;
}
