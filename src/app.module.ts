import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CryptoModule } from './crypto/crypto.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017', {
      auth: { username: 'admin', password: 'admin' },
      authMechanism: 'DEFAULT',
      dbName: 'test',
    }),
    CryptoModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
