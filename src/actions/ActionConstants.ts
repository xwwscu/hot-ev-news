export interface IAppAction {
    type: string,
    payload: any
}

export const ACTION_INIT = 'init_action';
export const UPDATE_WELCOME_SHOWN = '';
export const UPDATE_LOGIN_STATE_SUC = '';
export const UPDATE_LOGIN_STATE_FAIL = '';
export const UPDATE_LOGIN_STATE_START = '';