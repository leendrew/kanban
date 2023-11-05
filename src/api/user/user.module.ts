import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { HashService } from '../../common';
import { CryptoService } from '../../shared';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: HashService,
      useClass: CryptoService,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
