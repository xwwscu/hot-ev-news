import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as AppConstants from './../AppConstants';
import CommentList from './CommentList';
import Button from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css';
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';
import ActionGetter from 'src/actions/ActionGetter';

// tslint:disable-next-line:no-namespace
namespace CommentListContainer {
    export interface IProps {
        hasLogIn: boolean;
        token: string;
        commentTotalPage: number;
        commentPageNum: number;
        commentPageData: AppConstants.IComment[];
        dispatchComments: (payload: any) => void;
    }

    export interface IState{
        comments: AppConstants.IComment[];
        currentPage: number;
        totalPage: number;
    }
}

class CommentListWrapper extends React.Component<CommentListContainer.IProps> {
    
    constructor(props: CommentListContainer.IProps) {
        super(props);
    }

    public componentWillMount() {
        const shouldFetchData = this.props.commentPageData.length <= 0;
        // tslint:disable-next-line:no-console
        // console.log(`CommentListContainer componentWillMount ${shouldFetchData}`);
        if (!shouldFetchData) {
            return;
        }
        const page = this.props.commentPageNum || 1;
        this.fetchAppComments(page, this.props.token);
    }

    private fetchAppComments = (page: number, token?: string) => {
        let fetchUrl = AppConstants.EV_HOT_NEWS_BASE_URL + `get-app-comment?page=${page}`;
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
            // console.log(jsonResp);
            const commentPayload = {
                commentPageData: jsonResp.app_comments,
                commentPageNum: page,
                commentTotalPage: Math.ceil(jsonResp.total/AppConstants.EV_HOT_NEWS_PAGE_LIMIT)
            }
            this.props.dispatchComments(commentPayload);
        });
    }

    private onPageBtnClicked = (action: string) => {
        if (!this.props.hasLogIn) {
            Toast.info("没有免费的午餐，还是去登陆吧！");
            return;
        }
        let nextPage: number;
        if (action === "next") {
            nextPage = this.props.commentPageNum + 1;
        } else {
            nextPage = this.props.commentPageNum - 1;
        }
        // tslint:disable-next-line:no-console
        // console.log(`CommentListContainer onPageBtn cur:${this.props.commentPageNum}, next:${nextPage}`);
        this.fetchAppComments(nextPage, this.props.token);
    }

    public render() {
        const { commentPageData, commentPageNum, commentTotalPage } = this.props;
        const pagiLocale = {
            prevText: '上一页',
            nextText: '下一页',
        };
        const isPrevBtnDisabled = commentPageNum <= 1;
        const isNextBtnDisabled = commentPageNum >= commentTotalPage;
        const pagText = `${commentPageNum}/${commentTotalPage}`;
        const commentsListView = commentPageData.length === 0
            ? <div style={{flexGrow:1, alignSelf:"center", textAlign:"center", fontSize:20}}>暂无评论数据</div>
            : <div style={{display: "flex", flexDirection: "column", width:"100%"}}>
                <CommentList comments={commentPageData}/>
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
        token: state.token,
        commentPageData: state.commentPageData,
        commentPageNum: state.commentPageNum,
        commentTotalPage: state.commentTotalPage
    }
);

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        dispatchComments: (payload: any) => dispatch(ActionGetter.getUpdateCommentAction(payload))
    }
}

const CommentListContainer = connect(mapStateToProps, mapDispatchToProps)(CommentListWrapper);
export default CommentListContainer;