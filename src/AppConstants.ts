/**
 * Constants or Interface for app.
 */
export interface IAppState {
    hasLogIn: boolean;
    hasWelcomeShown: boolean;
    userAccount: string;
    userNickName: string;
    token: string;
    pageNum: number;
}

export const AppInitState: IAppState = {
    hasLogIn: false,
    hasWelcomeShown: false,
    userAccount: 'unknown',
    userNickName: 'unknown',
    token: 'unknown',
    pageNum: 0
}

export interface INews {
    title: string;
    title_en: string;
    from: string;
    time: string;
    content: string;
    content_en: string;
    detail_url: string;
}

export interface IComment {
    from_user: {
        nick_name: string
    };
    comment: string;
    time: string;
}

export const EV_HOT_NEWS_BASE_URL = 'http://www.xiaoliusuibianwan.com/ev-news/';
export const EV_HOT_NEWS_BASE_URL_DEBUG = 'http://localhost:8182/ev-news/';