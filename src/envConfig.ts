export const isServer = typeof window === 'undefined';
export const isLocalEnv = process.env.NODE_ENV === 'development';

export const host = isLocalEnv
  ? 'http://localhost:3000'
  : 'https://boardconnect.co.kr';
