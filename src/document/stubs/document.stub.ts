import { Document } from '../schemas/document.schema';

export const documentStub = (): Document => {
  return {
    apiKey: 'test api key',
    content: 'test@example.com',
    height: 23,
    width: 123,
  };
};
