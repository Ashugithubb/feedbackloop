import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpvoteDto } from './dto/create-upvote.dto';
import { UpdateUpvoteDto } from './dto/update-upvote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Upvote } from './entities/upvote.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { FeedbackService } from 'src/feedback/feedback.service';

@Injectable()
export class UpvotesService {
  constructor(@InjectRepository(Upvote) private readonly upvotesRepo: Repository<Upvote>,
    private readonly userService: UserService,
    private readonly feedbackService: FeedbackService) { }

  async create(@Body() createUpvoteDto: CreateUpvoteDto) {
    const { userId, feedbackId } = createUpvoteDto;
    const user = await this.userService.findOne(userId);
    const feedback = await this.userService.findOne(feedbackId);
    if (!user || !feedback) throw new NotFoundException("");

    const existing = await this.upvotesRepo.findOne({
      where: {
        user: { id: userId },
        feedback: { id: feedbackId }
      }
    })
    if (existing) {
      existing.votes = 0
      return "DownVoted";
    }

    const newUpvote = this.upvotesRepo.create({
      user,
      feedback,
      votes: 1
    })
    await this.upvotesRepo.save(newUpvote)
    return "UpVoted";
  }


  findAll() {
    return `This action returns all upvotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upvote`;
  }

  update(id: number, updateUpvoteDto: UpdateUpvoteDto) {
    return `This action updates a #${id} upvote`;
  }

  remove(id: number) {
    return `This action removes a #${id} upvote`;
  }
}
