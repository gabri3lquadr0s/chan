import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
export declare class RepliesService {
    create(createReplyDto: CreateReplyDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReplyDto: UpdateReplyDto): string;
    remove(id: number): string;
}
