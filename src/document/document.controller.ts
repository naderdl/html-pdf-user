import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiKey } from './apiKey.decorator';
import { ApiKeyGuard } from './apiKey.guard';
import { DocumentService } from './document.service';
import {
  CreateDocumentDto,
  CreateDocumentQueryParamDto,
} from './dto/create-document.dto';
import { FindAllDocumentDto } from './dto/findAll-document.dto';

@UseGuards(ApiKeyGuard)
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @Query() createDocumentQueryParamDto: CreateDocumentQueryParamDto,
    @ApiKey() apiKey: string,
  ) {
    return this.documentService.create(
      createDocumentDto,
      createDocumentQueryParamDto,
      apiKey,
    );
  }

  @Get()
  findAll(
    @Query() findAllDocumentDto: FindAllDocumentDto,
    @ApiKey() apiKey: string,
  ) {
    return this.documentService.findAll(findAllDocumentDto, apiKey);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ApiKey() apiKey: string) {
    return this.documentService.findOne(id, apiKey);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ApiKey() apiKey: string) {
    return this.documentService.remove(id, apiKey);
  }

  @Get('/download/:id')
  async downloadOne(
    @Param('id') id: string,
    @ApiKey() apiKey: string,
    @Res() response: Response,
  ) {
    const documentBuffer = await this.documentService.downloadOne(id, apiKey);

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    response.end(documentBuffer, 'binary');
  }
}
