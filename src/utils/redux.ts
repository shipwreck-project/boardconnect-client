import { createAction } from '@reduxjs/toolkit';

export const createEntity = <Params extends any[], Payload>(
  prefix: string,
  endPoint: EndPoint<Params, Payload>,
) => {
  const actionTypes = {
    request: `${prefix}_REQUEST`,
    success: `${prefix}_SUCCESS`,
    failure: `${prefix}_FAILURE`,
  };

  const entity = {
    request: createAction(actionTypes.request, (params: Params) => ({
      payload: params,
    })),
    success: createAction(actionTypes.success, (payload: Payload) => ({
      payload,
    })),
    failure: createAction(actionTypes.failure, (err: string) => ({
      payload: err, // TODO: 에러 정리리
    })),
    endPoint,
  };

  return [actionTypes, entity] as const;
};
