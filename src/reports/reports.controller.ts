import { Post, Body, Controller } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
  @Post()
  createReport(@Body() body: CreateReportDto) {}
}
