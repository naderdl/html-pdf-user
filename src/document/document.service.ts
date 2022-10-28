import { Injectable } from '@nestjs/common';
import {
  CreateDocumentDto,
  CreateDocumentQueryParamDto,
} from './dto/create-document.dto';
import { Document, DocumentDocument } from './schemas/document.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generatePdf } from 'html-pdf-node';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<DocumentDocument>,
  ) {}
  async create(
    createDocumentDto: CreateDocumentDto,
    createDocumentQueryParamDto: CreateDocumentQueryParamDto,
  ) {
    const document = new this.documentModel({
      ...createDocumentDto,
      ...createDocumentQueryParamDto,
    });

    const savedDocument = await document.save();
    console.log(savedDocument);

    const fileBuffer = await generatePdf(
      { content: savedDocument.content },
      {
        height: savedDocument.height,
        width: savedDocument.width,
      },
    );

    return fileBuffer;
  }

  findAll() {
    return `This action returns all document`;
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
