import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth';
import { GetFeedbackQueryDto } from './dto/feedback.query.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto, @Req() req) {
    const userId = req.user.id
    return this.feedbackService.create(createFeedbackDto, userId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackService.update(id, updateFeedbackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAll(@Req() req) {
  //   const userId = req.user.id;
  //   return this.feedbackService.findAllUserFeedback(userId);
  // }

  //  @Get('list')
  //  showAllFeeback() {
  //   return this.feedbackService.showAllFeebackWithUserDeatails(); 
  // }

  @Get()
   async showAllFeeback(@Query() query:GetFeedbackQueryDto) {
 
    return await this.feedbackService.showAllFeeback(query);
    
  }




 




  




}
