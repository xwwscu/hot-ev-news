import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as AppConstants from './../AppConstants';
import ActionGetter from './../actions/ActionGetter';
import NewsList from './NewsList';
import Button from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css';
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';

interface IComponentProps {
    hasLogIn: boolean;
    token: string;
    newsPageNum: number;
    newsTotalPage: number;
    newsPageData: AppConstants.INews[]
    dispatchNewsData: (payload: any) => void;
}

/* interface IComponentState {
    news: AppConstants.INews[],
    currentPage: number,
    totalPage: number
} */

class NewsListContainerComponent extends React.Component<IComponentProps> {

    constructor(props: IComponentProps) {
        super(props);
        
    }

    /* public shouldComponentUpdate(nextProps: IComponentProps) {
        const shouldNotUpdate = this.props.newsPageData.length <= 0 
            && this.props.newsPageNum === nextProps.newsPageNum && this.props.hasLogIn === nextProps.hasLogIn;
        // tslint:disable-next-line:no-console
        console.log(`NewsListContainer shouldComponentNotUpdate: ${shouldNotUpdate}`);
        return !shouldNotUpdate;
    } */

    public componentWillMount() {
        const shouldUpdate = this.props.newsPageData.length <= 0;
        // tslint:disable-next-line:no-console
        console.log(`NewsListContainer componentWillMount: ${shouldUpdate}`);
        if (!shouldUpdate) {
            return;
        }
        // fetch data
        const currentPage = this.props.newsPageNum || 1;
        this.fetchHotNews(currentPage);
    }

    private fetchHotNews(page: number, token?: string) {
        // const page = this.state.currentPage + 1;
        let requestUrl = AppConstants.EV_HOT_NEWS_BASE_URL + 'get-hot?page=' + page;
        if (token) {
            requestUrl = requestUrl + `&token=${token}`;
        }
        // tslint:disable-next-line:no-console
        // console.log(requestUrl);
        fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }})
            .then(response => response.json())
            .then((resJson) => {
                // tslint:disable-next-line:no-console
                // console.log(resJson);
                const payloadData = {
                    newsPageData: resJson.news,
                    newsPageNum: page,
                    newsTotalPage: Math.ceil(resJson.total/AppConstants.EV_HOT_NEWS_PAGE_LIMIT)
                }
                this.props.dispatchNewsData(payloadData);
                /* this.setState({
                    news: resJson.news,
                    currentPage: page,
                    totalPage: Math.ceil(resJson.total/AppConstants.EV_HOT_NEWS_PAGE_LIMIT)
                }) */
            });
    }

    private onPageBtnClicked = (action: string) => {
        if (!this.props.hasLogIn) {
            Toast.info("没有免费的午餐，去登陆吧！");
            return;
        }
        let nextPage: number;
        if (action === "next") {
            nextPage = this.props.newsPageNum + 1;
        } else {
            nextPage = this.props.newsPageNum - 1;
        }
        // tslint:disable-next-line:no-console
        console.log(`NewsListContainer onPageBtn cur:${this.props.newsPageNum}, next:${nextPage}`);
        this.fetchHotNews(nextPage, this.props.token);
    }

    public render() {
        const { newsPageData, newsPageNum, newsTotalPage } = this.props;
        const pagiLocale = {
            prevText: '上一页',
            nextText: '下一页',
        };
        const isPrevBtnDisabled = newsPageNum <= 1;
        const isNextBtnDisabled = newsPageNum < newsTotalPage;
        const pagText = `${newsPageNum}/${newsTotalPage}`;
        const newsView = newsPageData.length === 0
            ? <div style={{flexGrow:1, alignSelf:"center", textAlign:"center", fontSize:20}}>暂无新闻数据</div>
            : <div style={{display: "flex", flexDirection: "column", width:"100%"}}>
                <NewsList news={newsPageData} />
                <div className="News-list-pagination">
                    <Button 
                        disabled={isPrevBtnDisabled} 
                        onClick={()=>this.onPageBtnClicked("prev")}>
                        {pagiLocale.prevText}
                    </Button>
                    <span className="News-list-pagination-text">{pagText}</span>
                    <Button 
                        disabled={!isNextBtnDisabled}
                        onClick={()=>this.onPageBtnClicked("next")}>
                        {pagiLocale.nextText}
                    </Button>
                </div>
            </div>
        return (
            <div>
                {newsView}
            </div>
        );
    }
}

const mapStateToProps = (state: AppConstants.IAppState) => {
    return {
        hasLogIn: state.hasLogIn,
        token: state.token,
        newsPageNum: state.newsPageNum,
        newsPageData: state.newsPageData,
        newsTotalPage: state.newsTotalPage
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        dispatchNewsData: (payload: any) => {
            dispatch(ActionGetter.getUpdateNewsAction(payload));
        }
    }
}

const NewsListContainer = connect(mapStateToProps, mapDispatchToProps)(NewsListContainerComponent);
export default NewsListContainer;