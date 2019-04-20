import { IAppState, AppInitState } from '../AppConstants';
import * as ActionConstants from './../actions/ActionConstants';

export default class RootReducer {

    public reduceAction(state:IAppState=AppInitState, action: ActionConstants.IAppAction) {
        if (!action || !action.type) {
            return state;
        }
        switch (action.type) {
            case ActionConstants.UPDATE_WELCOME_SHOWN:
                return Object.assign({}, state, {
                    hasWelcomeShown: action.payload.hasWelcomeShown
                });
            case ActionConstants.UPDATE_LOGIN_STATE_START:
                return state;
            case ActionConstants.UPDATE_LOGIN_STATE_SUC:
                return Object.assign({}, state, {
                            hasLogIn: action.payload.hasLogIn,
                            userAccount: action.payload.userAccount,
                            userNickName: action.payload.userNickName,
                            userId: action.payload.userId,
                            token: action.payload.token,
                            userLevel: action.payload.userLevel
                        });
                // return state;
            case ActionConstants.UPDATE_LOGIN_STATE_FAIL:
                return state;
            case ActionConstants.UPDATE_HOT_NEWS_DATA:
                return Object.assign({}, state, {
                    newsPageData: action.payload.newsPageData,
                    newsPageNum: action.payload.newsPageNum,
                    newsTotalPage: action.payload.newsTotalPage
                });
            case ActionConstants.UPDATE_APP_COMMENTS_DATA:
                return Object.assign({}, state, {
                    commentPageData: action.payload.commentPageData,
                    commentPageNum: action.payload.commentPageNum,
                    commentTotalPage: action.payload.commentTotalPage
                });
            default:
                return state;
        }
    }
}

export function reduceApp(state: IAppState=AppInitState, appAction?: ActionConstants.IAppAction): IAppState {
    if (!appAction) {
        return state;
    }
    switch (appAction.type) {
        case ActionConstants.UPDATE_WELCOME_SHOWN:
            return state;
        case ActionConstants.UPDATE_LOGIN_STATE_START:
            return state;
        case ActionConstants.UPDATE_LOGIN_STATE_SUC:
            return state;
        case ActionConstants.UPDATE_LOGIN_STATE_FAIL:
            return state;
        default:
            return state;
    }
}