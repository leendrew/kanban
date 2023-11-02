import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import type { Repository } from 'typeorm';
import { ConfigService } from '../../config';
import { HashService } from '../../common';
import { UserService } from '../user/user.service';
import type { User } from '../user/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const { name, login, password } = dto;
      const hashedPassword = await this.hashService.hash(password);

      const user = this.userRepository.create({ name, login, password: hashedPassword });
      const createdUser = await this.userRepository.save(user);

      return createdUser;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async login(dto: LoginDto) {
    const { login, password } = dto;
    const user = await this.userRepository.findOneBy({ login });
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const isPasswordsEqual = await this.hashService.compare(password, user.password);
    if (!isPasswordsEqual) {
      throw new Error('Wrong password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        login: user.login,
      },
      {
        secret: this.configService.jwt.secret,
        expiresIn: this.configService.jwt.accessTtl,
      },
    );

    return { access: accessToken };
  }
}
