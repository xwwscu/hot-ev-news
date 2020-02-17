import * as React from 'react';
import { IComment } from './../AppConstants';
import './../styles/CommentList.css';
import Card from 'antd-mobile/lib/card';
import 'antd-mobile/lib/card/style/css';
import avatarUrl from './../assets/comment-avatar.jpg';

// tslint:disable-next-line:no-namespace
namespace CommentList {
    export interface IProps {
        comments?: IComment[];
    }
}

export default class CommentList extends React.Component<CommentList.IProps> {

    /* private renderCommentItem = (index: number, comment: IComment) => {
        return (
            <div key={index} className="Comments-list-item">
                <div className="Comments-list-item-user">{comment.from_user.nick_name}</div>
                <div className="Comments-list-item-comment">{comment.comment}</div>
                <div className="Comments-list-item-date">{comment.time}</div>
            </div>
        );
    } */

    public render() {
        const comments = this.props.comments || [];
        const listView = comments.length === 0 
            ? <div>数据加载失败...</div>
            : <div>
                {
                    comments.map((comment, index) => (
                        <Card key={index}>
                            <Card.Header
                                title={comment.from_user.nick_name}
                                thumb={avatarUrl}
                                thumbStyle={{width:40, height:40}}
                            />
                            <Card.Body>
                                <div style={{width:"100%", textAlign:"center"}}>{comment.comment}</div>
                            </Card.Body>
                            <Card.Footer extra={comment.time.substring(0, comment.time.indexOf('T') > 0 ? comment.time.indexOf('T') : comment.time.length)} />
                        </Card>
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