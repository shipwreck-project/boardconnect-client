import { CountState } from 'store/count';
import { GameState } from 'store/game';

declare global {
  type StoreState = {
    count: CountState;
    game: GameState;
  };
  type Entity = {
    request: (...args: any[]) => any;
    success: (...args: any[]) => any;
    failure: (...args: any[]) => any;
    endPoint: EndPoint;
  };
}
