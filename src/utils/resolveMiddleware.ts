import { Middleware, Action } from 'redux';

type ResolveFn = (value?: any) => void;
type WaitingAction = {
  type: string;
  resolve: ResolveFn;
};

const createMiddleware = () => {
  let waitingActions: WaitingAction[] = [];

  const resolver = (action: Action) => {
    const needToResolve: ResolveFn[] = [];
    waitingActions = waitingActions.filter(({ type, resolve }) => {
      if (type === action.type) {
        needToResolve.push(resolve);
        return false;
      }
      return true;
    });
    needToResolve.forEach(resolve => resolve(action));
  };

  const middleware: Middleware = () => next => action => {
    const returnValue = next(action);
    resolver(action);
    return returnValue;
  };

  async function waitAction<T extends Action>(type: T['type']) {
    const action = await new Promise<T>(resolve =>
      waitingActions.push({ type, resolve }),
    );
    return action;
  }

  return [middleware, waitAction] as const;
};

const [middleware, waitAction] = createMiddleware();

export { middleware, waitAction };
export default middleware;
