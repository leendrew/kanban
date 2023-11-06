import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from './api/user/user.entity';
import { Board } from './api/board/board.entity';
import { Task } from './api/task/task.entity';

const USERS_COUNT = 10;
const BOARDS_COUNT = 50;
const TASKS_COUNT = 100;

function randomIntTo(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  private async seedUsers(): Promise<void> {
    await this.userRepository.query('truncate table users cascade');
    await this.userRepository.query('alter sequence users_id_seq restart with 1');

    for (let i = 1; i <= USERS_COUNT; i++) {
      const user = new User();

      user.name = faker.person.firstName();
      user.login = `user_${i}`;
      user.password = 'pass';

      await this.userRepository.save(user);
    }
  }

  private async seedBoards(): Promise<void> {
    await this.boardRepository.query('truncate table boards cascade');
    await this.userRepository.query('alter sequence boards_id_seq restart with 1');

    for (let i = 1; i <= BOARDS_COUNT; i++) {
      const board = new Board();

      board.name = `board_${i}`;
      board.user = await this.userRepository.findOneByOrFail({
        id: randomIntTo(1, USERS_COUNT),
      });

      await this.boardRepository.save(board);
    }
  }

  private async seedTasks(): Promise<void> {
    await this.taskRepository.query('truncate table tasks cascade');
    await this.userRepository.query('alter sequence tasks_id_seq restart with 1');

    for (let i = 1; i <= TASKS_COUNT; i++) {
      const task = new Task();

      task.name = faker.lorem.words({ min: 1, max: 5 });
      task.isCompleted = !!faker.number.int({ min: 0, max: 1 });
      task.board = await this.boardRepository.findOneByOrFail({
        id: randomIntTo(1, BOARDS_COUNT),
      });

      await this.taskRepository.save(task);
    }
  }

  public async seed(): Promise<void> {
    await this.seedUsers();
    await this.seedBoards();
    await this.seedTasks();
  }
}
