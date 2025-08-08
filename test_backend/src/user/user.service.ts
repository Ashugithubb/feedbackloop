import { ConflictException, ForbiddenException, forwardRef, Inject, Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HasingService } from 'src/hasing/hasing.service';
import { FeedbackService } from 'src/feedback/feedback.service';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly hasingService: HasingService,
    @Inject(forwardRef(() => FeedbackService))
    private readonly feedbackService: FeedbackService) { }

  async create(createUserDto: CreateUserDto) {
    const { userName, email, password } = createUserDto;

    createUserDto.password = await this.hasingService.hashPassword(createUserDto.password);

    const userNameExist = await this.userRepo.findOneBy({ userName });

    if (userNameExist) throw new ConflictException("User Name Already Exist");

    const emailExist = await this.userRepo.findOneBy({ email });

    if (emailExist) throw new ConflictException("email Already Exist");

    await this.userRepo.save(createUserDto);

    return { "msg": "User Succesfully Registered" }

  }

  async findOneByEmailOrUserName(emailOrUsername: string) {
    let user: User;
    if (emailOrUsername) {

      const user = await this.userRepo.findOne({
        where: { userName: emailOrUsername },
        select: ["email", "id", "password"]
      })

      if (user != null) { return user; }
    }

    if (emailOrUsername) {
      const user = await this.userRepo.findOne({

        where: { userName: emailOrUsername },

        select: ["email", "userName", "id", "password"]
      })

      return user;
    }
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({ id })
  }


  async findAlluser(userId: number) {
    if (userId == 1) {
      return await this.userRepo.find();
    }
    throw new ForbiddenException()
  }

  async disableUser(userId: number, adminId: number) {
    if (adminId == 1) {
      await this.userRepo.softDelete(userId);
    }
    throw new ForbiddenException()
  }


  async seeMyFeedbacks(userId: number) {
    return await this.feedbackService.findAllUserFeedback(userId);
  }





  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}































