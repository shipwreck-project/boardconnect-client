import { CountState } from 'store/count';
import { GameState } from 'store/game';
import { AuthState } from 'store/auth';

declare global {
  type StoreState = {
    count: CountState;
    game: GameState;
    auth: AuthState;
  };
  type Entity = {
    request: (...args: any[]) => any;
    success: (...args: any[]) => any;
    failure: (...args: any[]) => any;
    endPoint: EndPoint;
  };
}
