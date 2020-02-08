import { User } from 'models';

export const login = async (_: { token: string }) => {
  const mock: User = { id: 'mock-id', username: 'mock-user' };
  return { user: mock };
};
