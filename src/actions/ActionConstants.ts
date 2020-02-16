export interface IAppAction {
    type: string,
    payload: any
}

export const ACTION_INIT = 'init_action';
export const UPDATE_WELCOME_SHOWN = 'show_splash';
export const UPDATE_LOGIN_STATE_SUC = 'login_suc';
export const UPDATE_LOGIN_STATE_FAIL = '';
export const UPDATE_LOGIN_STATE_START = '';
export const UPDATE_HOT_NEWS_DATA = 'update_hot_news';
export const UPDATE_APP_COMMENTS_DATA = 'update_app_comment';