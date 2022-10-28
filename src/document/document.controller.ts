import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import {
  CreateDocumentDto,
  CreateDocumentQueryParamDto,
} from './dto/create-document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @Query() createDocumentQueryParamDto: CreateDocumentQueryParamDto,
  ) {
    return this.documentService.create(
      createDocumentDto,
      createDocumentQueryParamDto,
    );
  }

  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentService.remove(+id);
  }
}
