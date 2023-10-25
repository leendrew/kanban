import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { HashService } from '../../common';
import { CryptoService, JwtService } from '../../shared';
import { User } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.registerAsync({ useClass: JwtService })],
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
