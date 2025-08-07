import { forwardRef, Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { TagModule } from 'src/tag/tag.module';
import { FeedbackTag } from 'src/feedback-tag/entities/feedback-tag.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Feedback,FeedbackTag]),TagModule,forwardRef(() =>UserModule)],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService],
  
})
export class FeedbackModule {}
