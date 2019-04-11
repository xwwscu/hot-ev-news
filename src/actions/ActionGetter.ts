import * as ActionConstants from './../actions/ActionConstants';

export default class ActionGetter {

    public static getInitAction(): ActionConstants.IAppAction {
        return {
            type: ActionConstants.ACTION_INIT,
            payload: 'init'
        }
    }

    public static getUpdateWelcomeAction(): ActionConstants.IAppAction {
        return {
            type: '',
            payload: ''
        }
    }
}