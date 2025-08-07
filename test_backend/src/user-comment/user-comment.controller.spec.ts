import { Test, TestingModule } from '@nestjs/testing';
import { UserCommentController } from './user-comment.controller';
import { UserCommentService } from './user-comment.service';

describe('UserCommentController', () => {
  let controller: UserCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCommentController],
      providers: [UserCommentService],
    }).compile();

    controller = module.get<UserCommentController>(UserCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
