import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import {
  CreateDocumentDto,
  CreateDocumentQueryParamDto,
} from './dto/create-document.dto';
import { FindAllDocumentDto } from './dto/findAll-document.dto';
import { Document } from './schemas/document.schema';
import { documentStub } from './stubs/document.stub';

jest.mock('./document.service');

describe('DocumentController', () => {
  let controller: DocumentController;
  let service: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [DocumentService],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
    service = module.get<DocumentService>(DocumentService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let documentResult: { id: string };
      const dto = new CreateDocumentDto();
      const queryDto = new CreateDocumentQueryParamDto();
      beforeEach(async () => {
        documentResult = await controller.create(
          dto,
          queryDto,
          documentStub().apiKey,
        );
      });

      test('then it should call documentService', () => {
        expect(service.create).toBeCalledWith(
          dto,
          queryDto,
          documentStub().apiKey,
        );
      });

      test('then it should return a document id', () => {
        expect(documentResult).toEqual({ id: 'id' });
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is Called', () => {
      let documents: Document[];
      const dto = new FindAllDocumentDto();

      beforeEach(async () => {
        documents = await service.findAll(dto, documentStub().apiKey);
      });

      test('then it should call documentService', () => {
        expect(service.findAll).toBeCalledWith(dto, documentStub().apiKey);
      });

      test('then it should return a document', () => {
        expect(documents).toEqual([documentStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is Called', () => {
      let document: Document;
      const documentId = 'id';

      beforeEach(async () => {
        document = await service.findOne(documentId, documentStub().apiKey);
      });

      test('then it should call documentService', () => {
        expect(service.findOne).toBeCalledWith(
          documentId,
          documentStub().apiKey,
        );
      });

      test('then it should return a document', () => {
        expect(document).toEqual(documentStub());
      });
    });
  });

  describe('remove', () => {
    describe('when remove is Called', () => {
      let result: any;
      const documentId = 'id';

      beforeEach(async () => {
        result = await service.remove(documentId, documentStub().apiKey);
      });

      test('then it should call documentService', () => {
        expect(service.remove).toBeCalledWith(
          documentId,
          documentStub().apiKey,
        );
      });

      test('then it should return a success', () => {
        expect(result).toEqual({ deleted: true });
      });
    });
  });

  describe('downloadOne', () => {
    describe('when remove is Called', () => {
      let result: Buffer;
      const documentId = 'id';

      beforeEach(async () => {
        result = await service.downloadOne(documentId, documentStub().apiKey);
      });

      test('then it should call documentService', () => {
        expect(service.downloadOne).toBeCalledWith(
          documentId,
          documentStub().apiKey,
        );
      });

      test('then it should return a success', () => {
        expect(result).toEqual(Buffer.from('test'));
      });
    });
  });
});
