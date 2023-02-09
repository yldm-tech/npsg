import { SetMetadata } from '@nestjs/common';
export const IS_PUBLIC_KEY = 'isPublic';
/**
 * 判断是否是公开的API
 * @returns 是否公开
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
