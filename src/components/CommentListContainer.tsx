import * as React from 'react';
import { connect } from 'react-redux';
import * as AppConstants from './../AppConstants';
import CommentList from './CommentList';
import Button from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css';
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';

// tslint:disable-next-line:no-namespace
namespace CommentListContainer {
    export interface IProps {
        hasLogIn: boolean;
        token: string;
    }

    export interface IState{
        comments: AppConstants.IComment[];
        currentPage: number;
        totalPage: number;
    }
}

class CommentListWrapper extends 
    React.Component<CommentListContainer.IProps, CommentListContainer.IState> {
    
    constructor(props: CommentListContainer.IProps) {
        super(props);
        this.state = {
            comments: [],
            currentPage: 0,
            totalPage: 1
        }
    }

    public shouldComponentUpdate() {
        return this.state.comments.length <= 0;
    }

    public componentDidMount() {
        const page = this.state.currentPage || 1;
        this.fetchAppComments(page, this.props.token);
    }

    private fetchAppComments = (page: number, token?: string) => {
        let fetchUrl = AppConstants.EV_HOT_NEWS_BASE_URL_DEBUG + `get-app-comment?page=${page}`;
        if (token) {
            fetchUrl += `&token=${token}`;
        }
        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(response => response.json())
        .then(jsonResp => {
            // tslint:disable-next-line:no-console
            console.log(jsonResp);
            this.setState({
                comments: jsonResp.app_comments,
                currentPage: page,
                totalPage: Math.ceil(jsonResp.total/AppConstants.EV_HOT_NEWS_PAGE_LIMIT)
            });
        });
    }

    private onPageBtnClicked = (action: string) => {
        if (!this.props.hasLogIn) {
            Toast.info("没有免费的午餐，还是去登陆吧！");
            return;
        }
        let nextPage: number;
        if (action === "next") {
            nextPage = this.state.currentPage + 1;
        } else {
            nextPage = this.state.currentPage - 1;
        }
        // tslint:disable-next-line:no-console
        console.log(`CommentListContainer onPageBtn cur:${this.state.currentPage}, next:${nextPage}`);
        this.fetchAppComments(nextPage, this.props.token);
    }

    public render() {
        const { comments, currentPage, totalPage } = this.state;
        const pagiLocale = {
            prevText: '上一页',
            nextText: '下一页',
        };
        const isPrevBtnDisabled = currentPage <= 1;
        const isNextBtnDisabled = currentPage < totalPage;
        const pagText = `${currentPage}/${totalPage}`;
        const commentsListView = comments.length === 0
            ? <div style={{flexGrow:1, alignSelf:"center", textAlign:"center", fontSize:20}}>暂无评论数据</div>
            : <div style={{display: "flex", flexDirection: "column", width:"100%"}}>
                <CommentList comments={comments}/>
                <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"center", alignItems:"center"}}>
                    <Button 
                        disabled={isPrevBtnDisabled} 
                        onClick={()=>this.onPageBtnClicked("prev")}>
                        {pagiLocale.prevText}
                    </Button>
                    <span style={{marginLeft:10, marginRight:10, fontSize:16}}>{pagText}</span>
                    <Button 
                        disabled={isNextBtnDisabled}
                        onClick={()=>this.onPageBtnClicked("next")}>
                        {pagiLocale.nextText}
                    </Button>
                </div>
            </div>
        return (
            <div>
                {commentsListView}
            </div>
        );
    }
}

const mapStateToProps = (state: AppConstants.IAppState) => (
    {
        hasLogIn: state.hasLogIn,
        token: state.token
    }
);

const CommentListContainer = connect(mapStateToProps, null)(CommentListWrapper);
export default CommentListContainer;