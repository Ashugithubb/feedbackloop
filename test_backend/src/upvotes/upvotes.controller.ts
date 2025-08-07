import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpvotesService } from './upvotes.service';
import { CreateUpvoteDto } from './dto/create-upvote.dto';
import { UpdateUpvoteDto } from './dto/update-upvote.dto';

@Controller('upvotes')
export class UpvotesController {
  constructor(private readonly upvotesService: UpvotesService) {}

  @Post()
  create(@Body() createUpvoteDto: CreateUpvoteDto) {
    return this.upvotesService.create(createUpvoteDto);
  }

  @Get()
  findAll() {
    return this.upvotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.upvotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUpvoteDto: UpdateUpvoteDto) {
    return this.upvotesService.update(+id, updateUpvoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.upvotesService.remove(+id);
  }
}
