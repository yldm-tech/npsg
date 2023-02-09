import path from 'path';
import type { ConfigModule } from '@nestjs/config';

export type ConfigModuleOptions = Parameters<typeof ConfigModule.forRoot>[0];

export type ConfigFactories = ConfigModuleOptions['load'];

/**
 * 获取服务端的运行环境
 *
 * 喜欢 egg.js 运行环境管理
 *
 * @see https://eggjs.org/zh-cn/basics/env.html
 */
export function getServerEnv(): string {
  const serverEnv = process.env.NEST_SERVER_ENV;
  if (typeof serverEnv === 'string') return serverEnv;

  const env = process.env.NODE_ENV;
  if (env === 'production') {
    return 'prod';
  } else if (env === 'test') {
    return 'unittest';
  } else {
    return 'local';
  }
}

/**
 * 喜欢 egg.js 的配置方式
 *
 * @see https://eggjs.org/zh-cn/basics/config.html
 */
export function useConfigLoader(
  baseDir: string,
  factories?: ConfigFactories,
): ConfigFactories {
  const files = ['config/config.default', `config/config.${getServerEnv()}`];
  return files.reduce((configs, filename) => {
    const fullPath = path.join(baseDir, filename);
    try {
      // eslint-disable-next-line
        const mod = require(fullPath);
      return configs.concat(mod.__esModule && mod.default ? mod.default : mod);
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        console.warn('[configuration] file not found: ', fullPath);
        return configs;
      }
      throw err;
    }
  }, factories || []);
}
