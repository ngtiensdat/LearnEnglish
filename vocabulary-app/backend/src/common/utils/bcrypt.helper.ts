import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * BcryptHelper — utility class for password hashing and comparison.
 * Centralizes bcrypt usage to a single place for easy testing and swapping.
 */
export class BcryptHelper {
  static async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, SALT_ROUNDS);
  }

  static async compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}
