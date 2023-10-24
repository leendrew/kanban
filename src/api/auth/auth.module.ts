import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashBase } from '../../common';
import { HashService } from '../../shared';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: HashBase,
      useClass: HashService,
    },
    AuthService,
  ],
  exports: [],
})
export class AuthModule {}
