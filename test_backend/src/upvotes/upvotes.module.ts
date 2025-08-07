import { Module } from '@nestjs/common';
import { UpvotesService } from './upvotes.service';
import { UpvotesController } from './upvotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upvote } from './entities/upvote.entity';
import { UserModule } from 'src/user/user.module';
import { FeedbackModule } from 'src/feedback/feedback.module';

@Module({
  imports:[TypeOrmModule.forFeature([Upvote]),UserModule,FeedbackModule],
  controllers: [UpvotesController],
  providers: [UpvotesService],
})
export class UpvotesModule {}
