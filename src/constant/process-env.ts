export interface ProcessEnv {
  // db
  DATABASE_URL: string;
  // aws
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_REGION: string;
  AWS_BUCKET_NAME: string;
  //jwt
  JWT_SECRET: string;
  // redis
  REDIS_HOST: string;
  REDIS_PORT: number;
}

export const processEnv: ProcessEnv = {
  // db
  DATABASE_URL: process.env.DATABASE_URL,
  // aws
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  //jwt
  JWT_SECRET: process.env.JWT_SECRET,
  // redis
  REDIS_HOST: process.env.REDIS_HOST as string,
  REDIS_PORT: process.env.REDIS_PORT as unknown as number,
};
