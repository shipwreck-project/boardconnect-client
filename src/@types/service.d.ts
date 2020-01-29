type EndPoint<Params extends any[], Payload> = (
  ...p: Params
) => Promise<Payload>;
