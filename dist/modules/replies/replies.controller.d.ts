import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
export declare class RepliesController {
    private readonly repliesService;
    constructor(repliesService: RepliesService);
    create(createReplyDto: CreateReplyDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateReplyDto: UpdateReplyDto): string;
    remove(id: string): string;
}
