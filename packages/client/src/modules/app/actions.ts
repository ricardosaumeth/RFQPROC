import { ActionUnion, createAction } from 'modules/redux/utils';

export enum APP_ACTION_TYPES {
  BOOTSTRAP_APP = 'BOOTSTRAP_APP',
}

export const AppAction = {
  bootstrapApp: createAction<APP_ACTION_TYPES.BOOTSTRAP_APP>(APP_ACTION_TYPES.BOOTSTRAP_APP),
};

export type AppActions = ActionUnion<typeof AppAction>;
export type BootstrapApp = ReturnType<typeof AppAction.bootstrapApp>;
