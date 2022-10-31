import { documentStub } from '../stubs/document.stub';

export const DocumentService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue({ id: 'id' }),
  findAll: jest.fn().mockResolvedValue([documentStub()]),
  findOne: jest.fn().mockResolvedValue(documentStub()),
  remove: jest.fn().mockResolvedValue({ deleted: true }),
  downloadOne: jest.fn().mockResolvedValue(Buffer.from('test')),
});
