import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { HashService } from '../../common';
import { User } from '../user';
import { RegisterDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
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

    // TODO: jwt
    return true;
  }
}
