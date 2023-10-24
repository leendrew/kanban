import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from '../../common';
import { CryptoService } from '../../shared';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: HashService,
      useClass: CryptoService,
    },
    AuthService,
  ],
  exports: [],
})
export class AuthModule {}
