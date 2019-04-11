import { IAppState, AppInitState } from '../AppConstants';
import * as ActionConstants from './../actions/ActionConstants';

export default class RootReducer {

    public reduceAction(state:IAppState=AppInitState, action: ActionConstants.IAppAction) {
        if (!action) {
            return state;
        }
        switch (action.type) {
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