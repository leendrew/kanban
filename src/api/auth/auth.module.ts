import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HashService } from '../../common';
import { CryptoService, JwtService } from '../../shared';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({ useClass: JwtService }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashService,
      useClass: CryptoService,
    },
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
