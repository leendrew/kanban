import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashBase {
  abstract hash(data: string): Promise<string>;

  abstract compare(data: string, encrypted: string): Promise<boolean>;
}
