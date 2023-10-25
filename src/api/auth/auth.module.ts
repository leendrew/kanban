import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from '../../common';
import { CryptoService } from '../../shared';
import { ConfigService } from '../../config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({ ...config.jwt }),
    }),
  ],
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
