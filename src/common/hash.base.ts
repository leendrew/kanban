import { Injectable } from '@nestjs/common';

interface HashBase {
  hash(data: string): Promise<string>;
  compare(data: string, encrypted: string): Promise<boolean>;
}

@Injectable()
export abstract class HashService implements HashBase {
  abstract hash(data: string): Promise<string>;
  abstract compare(data: string, encrypted: string): Promise<boolean>;
}
