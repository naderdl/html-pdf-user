import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateDocumentDto,
  CreateDocumentQueryParamDto,
} from './dto/create-document.dto';
import { Document, DocumentDocument } from './schemas/document.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindAllDocumentDto } from './dto/findAll-document.dto';
import { generatePdf } from 'html-pdf-node';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<DocumentDocument>,
  ) {}
  async create(
    createDocumentDto: CreateDocumentDto,
    createDocumentQueryParamDto: CreateDocumentQueryParamDto,
    apiKey: string,
  ) {
    const createdDocument = await this.documentModel.create({
      ...createDocumentDto,
      ...createDocumentQueryParamDto,
      apiKey,
    });

    return { id: createdDocument.id };
  }

  findAll(findAllDocumentDto: FindAllDocumentDto, apiKey: string) {
    return this.documentModel
      .find({ apiKey }, null, {
        sort: '_id',
        skip: findAllDocumentDto.size * (findAllDocumentDto.page - 1),
        limit: findAllDocumentDto.size,
      })
      .exec();
  }

  async findOne(id: string, apiKey: string) {
    const document = await this.documentModel
      .findOne({ _id: id, apiKey })
      .exec();
    if (!document) throw new NotFoundException('document not found');
    return document;
  }

  async remove(id: string, apiKey: string) {
    try {
      await this.documentModel.remove({ _id: id, apiKey });
      return { deleted: true };
    } catch (error) {
      return { deleted: false, message: error.message };
    }
  }

  async downloadOne(id: string, apiKey: string) {
    const document = await this.documentModel
      .findOne({ _id: id, apiKey })
      .exec();
    if (!document) throw new NotFoundException('document not found');
    return this.generatePdf(document);
  }

  private async generatePdf(document: DocumentDocument) {
    const fileBuffer = await generatePdf(
      { content: document.content },
      {
        height: document.height,
        width: document.width,
      },
    );

    return fileBuffer as Buffer;
  }
}
