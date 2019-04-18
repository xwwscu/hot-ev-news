import * as React from 'react';
import { connect } from 'react-redux';
import * as AppConstants from './../AppConstants';
import CommentList from './CommentList';

// tslint:disable-next-line:no-namespace
namespace CommentListContainer {
    export interface IProps {
        hasLogIn: boolean;
        token: string;
    }

    export interface IState{
        comments: AppConstants.IComment[];
    }
}

class CommentListWrapper extends 
    React.Component<CommentListContainer.IProps, CommentListContainer.IState> {
    
    constructor(props: CommentListContainer.IProps) {
        super(props);
        this.state = {
            comments: []
        }
    }

    public shouldComponentUpdate() {
        return this.state.comments.length <= 0;
    }

    public componentDidMount() {
        const fetchUrl = AppConstants.EV_HOT_NEWS_BASE_URL_DEBUG + 'get-app-comment';
        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }}).then(response => response.json())
            .then(jsonResp => {
                // tslint:disable-next-line:no-console
                console.log(jsonResp);
                this.setState({
                    comments: jsonResp.app_comments
                });
            });
    }

    public render() {
        const { comments } = this.state;
        return (
            <CommentList comments={comments}/>
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