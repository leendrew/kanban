import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import type { HashService } from '../common';

@Injectable()
export class CryptoService implements HashService {
  hash(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(16).toString('hex');
      scrypt(data, salt, 64, (err, key) => {
        if (err) {
          reject(err);
        }
        const hash = salt + ':' + key.toString('hex');
        resolve(hash);
      });
    });
  }

  compare(data: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':');
      const encryptedKey = Buffer.from(key, 'hex');
      scrypt(data, salt as string, 64, (err, key) => {
        if (err) {
          reject(err);
        }
        const isEqual = timingSafeEqual(encryptedKey, key);
        resolve(isEqual);
      });
    });
  }
}
