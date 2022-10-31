import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { DocumentService } from './document.service';
import {
  CreateDocumentDto,
  CreateDocumentQueryParamDto,
} from './dto/create-document.dto';
import { FindAllDocumentDto } from './dto/findAll-document.dto';
import { Document } from './schemas/document.schema';
import { documentStub } from './stubs/document.stub';

describe('DocumentService', () => {
  let service: DocumentService;
  let model: Model<Document>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        {
          provide: getModelToken(Document.name),
          useValue: {
            new: jest.fn().mockResolvedValue(documentStub()),
            constructor: jest.fn().mockResolvedValue(documentStub()),
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
            sort: jest.fn(),
            skip: jest.fn(),
            limit: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    model = module.get<Model<Document>>(getModelToken('Document'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new document', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() => documentStub());
    const document = await service.create(
      new CreateDocumentDto(),
      new CreateDocumentQueryParamDto(),
      '',
    );
    expect(document).toEqual({ id: undefined });
  });

  it('should return all document', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([documentStub()]),
    } as any);
    const documents = await service.findAll(new FindAllDocumentDto(), '');
    expect(documents).toEqual([documentStub()]);
  });

  it('should return a document', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(documentStub()),
    } as any);
    const documents = await service.findOne('', '');
    expect(documents).toEqual(documentStub());
  });

  it('should delete a document successfully', async () => {
    jest.spyOn(model, 'remove').mockResolvedValueOnce(true as any);
    expect(await service.remove('', '')).toEqual({ deleted: true });
  });
  it('should not delete a document', async () => {
    jest.spyOn(model, 'remove').mockRejectedValueOnce(new Error('Bad delete'));
    expect(await service.remove('', '')).toEqual({
      deleted: false,
      message: 'Bad delete',
    });
  });
});
