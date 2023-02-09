import { createHash, BinaryLike, HashOptions } from 'crypto';

export function hash(
  algorithm: string,
  data: BinaryLike,
  options?: HashOptions,
): string {
  return createHash(algorithm, options).update(data).digest('hex');
}
