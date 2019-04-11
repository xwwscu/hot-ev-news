import * as React from 'react';
import { IComment } from './../AppConstants';
import './../styles/CommentList.css';

// tslint:disable-next-line:no-namespace
namespace CommentList {
    export interface IProps {
        comments?: IComment[];
    }
}

export default class CommentList extends React.Component<CommentList.IProps> {

    public render() {
        const comments = this.props.comments || [];
        const listView = comments.length === 0 
            ? <div>数据加载失败...</div>
            : <div>
                {
                    comments.map((comment, index) => (
                        <div key={index} className="Comments-list-item">
                            <div className="Comments-list-item-user">{comment.from_user.nick_name}</div>
                            <div className="Comments-list-item-comment">{comment.comment}</div>
                            <div className="Comments-list-item-date">{comment.time}</div>
                        </div>
                    ))
                }
             </div>
        return (
            <div className="Comments-list">
                {listView}
            </div>
        );
    }
}