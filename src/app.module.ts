import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      auth: { username: 'admin', password: 'admin' },
      authMechanism: 'DEFAULT',
      dbName: 'test',
    }),
    DocumentModule,
  ],
})
export class AppModule {}
