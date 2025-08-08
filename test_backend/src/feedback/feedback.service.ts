import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tag/entities/tag.entity';
import { TagService } from 'src/tag/tag.service';
import { FeedbackTag } from 'src/feedback-tag/entities/feedback-tag.entity';
import { UserService } from 'src/user/user.service';
import { GetFeedbackQueryDto } from './dto/feedback.query.dto';
import { Score } from './enum/scrore.enum';
import { isObject } from 'class-validator';
import { Console } from 'console';


@Injectable()
export class FeedbackService {
  constructor(@InjectRepository(Feedback) private readonly feedbackRepo: Repository<Feedback>,
    @InjectRepository(FeedbackTag) private readonly feedbackTagRepo: Repository<FeedbackTag>,
    private readonly tagService: TagService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService) { }

  async create(createFeedbackDto: CreateFeedbackDto, userId: number) {

    const user = await this.userService.findOne(userId);
    if (!user) throw new UnauthorizedException("Please LogedId to add Feedback");

    const { title, description, status, tags } = createFeedbackDto;

    const tagsToBeAdded = await this.tagService.create(tags);

    const tagsIds = tagsToBeAdded?.map((t: Tag) => t.id);
    const newFeedback = await this.feedbackRepo.create({
      title,
      description,
      user
    })

    const feedback = await this.feedbackRepo.save(newFeedback);
    const feedbackId = feedback.id;

    const tagsAssigned: FeedbackTag[] = [];

    tagsIds.forEach((t: number) => {
      const assignedTag = this.feedbackTagRepo.create({
        feedback: { id: feedbackId },
        tag: { id: t }
      });
      tagsAssigned.push(assignedTag);
    });
    const feedbackAssigned = await this.feedbackTagRepo.save(tagsAssigned);

    return feedbackAssigned

  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {

    return await this.feedbackRepo.update(id, updateFeedbackDto);
  }

  async remove(id: number) {
    return await this.feedbackRepo.delete(id);
  }

  async findAllUserFeedback(userId: number) {
    return await this.feedbackRepo.find({
      where: { user: { id: userId } }
    })
  }

  async showAllFeebackWithUserDeatails(adminId: number) {
    if (adminId == 1) {
      return await this.feedbackRepo.find(
        {
          relations: ["user",],
          withDeleted: false
        }
      )
    }
  }

  //     async showAllFeeback(query: GetFeedbackQueryDto) {
  //     const {
  //       page = 1,
  //       limit = 10,
  //       authors,
  //       searchValue,
  //       sortOrder,
  //       tags
  //     } = query;

  //     const qb = this.feedbackRepo
  //       .createQueryBuilder('feedback')
  //       .leftJoinAndSelect('feedback.user', 'user')
  //       .leftJoinAndSelect('feedback.feedbackTag', 'feedbackTag')
  //     if (searchValue) {
  //       // qb.andWhere([
  //       //   'feedback.title ILIKE :title', { title: `%${searchValue}%` },
  //       //   'feedback.description ILIKE :description', { description: `%${searchValue}%` },
  //       // ]);
  //       qb.andWhere(
  //   '(feedback.title ILIKE :search OR feedback.description ILIKE :search)',
  //   { search: `%${searchValue}%` }
  // );
  //     }

  //     if (authors) {
  //       const author =parseInt(authors,10)
  //       qb.andWhere('user.id = :author', { author }); //authors->>author
  //     }
  //     if(tags){
  //        const tag =parseInt(tags,10)
  //       qb.andWhere('feedbackTag.tagId = :tag', { tag }); //tags->>tag
  //     }

  //     const [feedback, total] = await qb
  //        .addSelect('feedback.upVotes - feedback.downVotes', 'score')  //vartual coulmn
  //        .orderBy('score', sortOrder)  //orderbY
  //       .skip((page - 1) * limit)
  //       .take(limit)
  //       .getManyAndCount();
  //     return {
  //       total,
  //       page,
  //       limit,
  //       feedback,
  //     };
  //   }

  async findOne(id: number) {
    return await this.feedbackRepo.findOneBy({ id })
  }
  async showAllFeeback(query: GetFeedbackQueryDto) {
    const {
      page = 1,
      limit = 10,
      authors,
      searchValue,
      sortOrder,
      tags
    } = query;

    const qb = this.feedbackRepo
      .createQueryBuilder('feedback')
      .leftJoinAndSelect('feedback.user', 'user')
      .leftJoinAndSelect('feedback.feedbackTag', 'feedbackTag')
      .leftJoinAndSelect('feedbackTag.tag', "tag")

    qb.andWhere('feedback.status = :status', { status: 'Public' });
    if (searchValue) {
      qb.andWhere(
        '(feedback.title ILIKE :search OR feedback.description ILIKE :search)',
        { search: `%${searchValue}%` }
      );
    }

    if (authors) {
      qb.andWhere('user.id IN (:...authors)', { authors });
    }
    if (tags) {
      qb.andWhere('tag.id IN (:...tagIds)', { tagIds: tags });
    }
    const [feedback, total] = await qb
      .addSelect('feedback.upVotes - feedback.downVotes', 'score')
      .orderBy('score', sortOrder)
      .skip((page - 1) * limit)
      .take(limit)

      .getManyAndCount();
    return {
      total,
      page,
      limit,
      feedback,
    };
  }
}