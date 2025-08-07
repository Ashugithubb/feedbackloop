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

  async showAllFeebackWithUserDeatails(adminId:number) {
    if(adminId==1) {
    return await this.feedbackRepo.find(
      {
        relations: ["user",],
        withDeleted:false
      }
    )}
  }

  //   async showAllFeeback(query: GetFeedbackQueryDto) {
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
  //       qb.andWhere([
  //         'feedback.title ILIKE :title', { title: `%${searchValue}%` },
  //         'feedback.description ILIKE :description', { description: `%${searchValue}%` },
  //       ]);
  //     }

  //     if (authors) {
  //       const author =parseInt(authors,10)
  //       qb.andWhere('user.id = :authors', { author });
  //     }
  //     if(tags){
  //        const tag =parseInt(tags,10)
  //       qb.andWhere('feedbackTag.tagId = :tags', { tags });
  //     }

  //     const [feedback, total] = await qb
  //       .orderBy('feedback.id', sortOrder)
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

      qb.andWhere('feedback.status = :status', { status: 'Public' });
    if (searchValue) {
      qb.orWhere([
        'feedback.title ILIKE :title', { title: `%${searchValue}%` },
        'feedback.description ILIKE :description', { description: `%${searchValue}%` },
      ]);
    }

    if (authors) {
      qb.andWhere('user.id = :authors', { authors });
    }
    // if(tags){
    //   qb.andWhere('feedbackTag.tagId = :tags', { tags });
    // }

    if (tags) {
      let tagid: any = []
      console.log("yes")
      console.log(typeof tags);
      if (typeof tags === 'object') {
        console.log("check");
        Object.entries(tags).map((k) => {
          tagid.push(k);
          console.log(k)
          // console.log( k[idx].indexOf("0"));
        })
        console.log("Array", tagid);
        tagid.map((key) => {
          console.log("ke", typeof key[0])
        })
        for (let i = 0; i < tagid.length; i++) {
          const id: number = Number(tagid[i][1])
          console.log(typeof tagid[i][1]);
          console.log(tagid[i][1]);
          qb.andWhere('feedbackTag.tagId = :id', { id });
        }

      } else {

        qb.andWhere('feedbackTag.tagId = :tags', { tags });
      }}
    
      const [feedback, total] = await qb
        .orderBy('feedback.id', sortOrder)
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