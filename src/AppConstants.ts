/**
 * Constants or Interface for app.
 */
export interface IAppState {
    hasLogIn: boolean;
    hasWelcomeShown: boolean;
    userAccount: string;
    userId: string;
    userNickName: string;
    token: string;
    userLevel: number;
    newsTotalPage: number;
    newsPageNum: number;
    newsPageData: INews[];
    commentTotalPage: number;
    commentPageNum: number;
    commentPageData: IComment[];
}

export const AppInitState: IAppState = {
    hasLogIn: false,
    hasWelcomeShown: false,
    userAccount: 'unknown',
    userId: 'unknown',
    userNickName: 'unknown',
    token: 'unknown',
    userLevel: 100,
    newsTotalPage: 0,
    newsPageNum: 0,
    newsPageData: [],
    commentTotalPage: 0,
    commentPageNum: 0,
    commentPageData: []
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
export const EV_HOT_NEWS_USER_THRESH = 100;
export const EV_HOT_NEWS_PAGE_LIMIT = 6;