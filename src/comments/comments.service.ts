import { UpdateCommentDto } from './commentDto/update-comment.dto';
import { CreateCommentDto } from './commentDto/create-comment.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto){
    const newComment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(newComment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findOne(historyId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { historyId } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${historyId} not found`);
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);
    Object.assign(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
