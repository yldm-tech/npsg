import type { Request } from 'express';
import "reflect-metadata";

import { PATH_METADATA } from '@nestjs/common/constants';

export function urlFor(req: Request, path: string): URL {
  return new URL(path || '/', `${req.protocol}://${req.get('host')}`);
}

export function pathFor(
  Resource: { new (...args: any[]): any },
  name: string,
): string {
  const prefix = Reflect.getMetadata(PATH_METADATA, Resource) || '/';
  const path = Reflect.getMetadata(PATH_METADATA, Resource.prototype[name]);
  return prefix + path;
}
