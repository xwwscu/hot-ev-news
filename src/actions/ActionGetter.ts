import * as ActionConstants from './../actions/ActionConstants';

export default class ActionGetter {

    public static getInitAction(): ActionConstants.IAppAction {
        return {
            type: ActionConstants.ACTION_INIT,
            payload: 'init'
        }
    }

    public static getUpdateWelcomeAction(payload: any): ActionConstants.IAppAction {
        return {
            type: ActionConstants.UPDATE_WELCOME_SHOWN,
            payload
        }
    }

    public static getLogInSucAction(payload: any): ActionConstants.IAppAction {
        return {
            type: ActionConstants.UPDATE_LOGIN_STATE_SUC,
            payload,
        }
    }

    public static getUpdateNewsAction(payload: any): ActionConstants.IAppAction {
        return {
            type: ActionConstants.UPDATE_HOT_NEWS_DATA,
            payload
        }
    }

    public static getUpdateCommentAction(payload: any): ActionConstants.IAppAction {
        return {
            type: ActionConstants.UPDATE_APP_COMMENTS_DATA,
            payload
        }
    }

    public static getUpdateSelfCommentAction(payload: any): ActionConstants.IAppAction {
        return {
            type: ActionConstants.UPDATE_COMMENT_BY_SELF,
            payload
        }
    }
}