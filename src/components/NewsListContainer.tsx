import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Toast } from 'antd-mobile';
import * as AppConstants from './../AppConstants';
import NewsList from './NewsList';
import 'antd-mobile/dist/antd-mobile.css';

interface IComponentProps {
    hasLogIn: boolean;
    token: string;
    pageNum: number;
}

interface IComponentState {
    news: AppConstants.INews[],
    currentPage: number,
    totalPage: number
}

class NewsListContainerComponent extends React.Component<IComponentProps, IComponentState> {

    constructor(props: IComponentProps) {
        super(props);
        this.state = {
            news: [],
            currentPage: 0,
            totalPage: 1
        }
    }

    public shouldComponentUpdate() {
        return this.state.news.length <= 0;
    }

    public componentDidMount() {
        // fetch data
        const currentPage = this.state.currentPage || 1;
        this.fetchHotNews(currentPage);
    }

    private fetchHotNews(page: number, token?: string) {
        // const page = this.state.currentPage + 1;
        let requestUrl = AppConstants.EV_HOT_NEWS_BASE_URL_DEBUG + 'get-hot?page=' + page;
        if (token) {
            requestUrl = requestUrl + `&token=${token}`;
        }
        // tslint:disable-next-line:no-console
        console.log(requestUrl);
        fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }})
            .then(response => response.json())
            .then((resJson) => {
                // tslint:disable-next-line:no-console
                console.log(resJson);
                this.setState({
                    news: resJson.news,
                    currentPage: page,
                    totalPage: this.state.totalPage
                })
            });
    }

    private onPageBtnClicked = (action: string) => {
        if (!this.props.hasLogIn) {
            Toast.info("没有免费的午餐，去登陆吧！");
            return;
        }
        let nextPage: number;
        if (action === "next") {
            nextPage = this.state.currentPage + 1;
        } else {
            nextPage = this.state.currentPage - 1;
        }
        // tslint:disable-next-line:no-console
        console.log(`NewsListContainer onPageBtn cur:${this.state.currentPage}, next:${nextPage}`);
        this.fetchHotNews(nextPage, this.props.token);
    }

    public render() {
        const { news, currentPage, totalPage } = this.state;
        const pagiLocale = {
            prevText: '上一页',
            nextText: '下一页',
        };
        const isPrevBtnDisabled = currentPage <= 1;
        const isNextBtnDisabled = currentPage < totalPage;
        const pagText = `${currentPage}/${totalPage}`;
        const newsView = news.length === 0
            ? <div style={{position:"relative", width:"100%", height:"100%", 
                textAlign:"center", overflow:"hidden", fontSize:20}}>暂无新闻数据</div>
            : <div style={{display: "flex", flexDirection: "column", width:"100%"}}>
                <NewsList news={news} />
                <div className="News-list-pagination">
                    <Button 
                        disabled={isPrevBtnDisabled} 
                        onClick={()=>this.onPageBtnClicked("prev")}>
                        {pagiLocale.prevText}
                    </Button>
                    <span className="News-list-pagination-text">{pagText}</span>
                    <Button 
                        disabled={isNextBtnDisabled}
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
        pageNum: state.pageNum
    }
};

// const mapDispatchToProps;

const NewsListContainer = connect(mapStateToProps, null)(NewsListContainerComponent);
export default NewsListContainer;