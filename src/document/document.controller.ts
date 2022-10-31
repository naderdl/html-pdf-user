import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Header,
  StreamableFile,
} from '@nestjs/common';
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
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=quote.pdf')
  async downloadOne(@Param('id') id: string, @ApiKey() apiKey: string) {
    const fileBuffer = await this.documentService.downloadOne(id, apiKey);
    return new StreamableFile(fileBuffer);
  }
}
