import { CountState } from 'store/count';

declare global {
  type StoreState = {
    count: CountState;
  };
}
