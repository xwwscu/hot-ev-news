import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as AppConstants from './../AppConstants';
import CopyRightFooter from './CopyRightFooter';
import './../styles/SelfCenter.css';
import List from 'antd-mobile/lib/list';
import 'antd-mobile/lib/list/style/css';
import Button from 'antd-mobile/lib/button';
import 'antd-mobile/lib/button/style/css';
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';
import TextareaItem from 'antd-mobile/lib/textarea-item';
import 'antd-mobile/lib/textarea-item/style/css';

// tslint:disable-next-line:no-namespace
namespace SelfCenter {
    export interface IProps {
        userNickName: string;
        userAccount: string;
        userId: string;
        userLevel: number;
        token: string;
    }
}

class SelfCenter extends React.Component<SelfCenter.IProps> {
    // private textInput: React.RefObject<TextareaItem> = React.createRef<TextareaItem>();
    private mTextInput: TextareaItem;

    constructor(props:SelfCenter.IProps) {
        super(props);
    }

    /* public componentDidMount() {
        this.textInput.current!.focus();
    } */

    private onSubmit = () => {
        if (!this.mTextInput) {
            // tslint:disable-next-line:no-console
            console.log('onSubmit mTextInput is NULL!');
            return;
        }
        // tslint:disable-next-line:no-console
        // console.log(this.mTextInput);
        /* if (!this.textInput.current) {
            // tslint:disable-next-line:no-console
            console.log('onSubmit textInput.current not Exist!');
            return;
        } */
        const comment = this.mTextInput.state.value;
        const isInValidComment = !comment || comment.trim().length<=0;
        if (isInValidComment) {
            Toast.info('请输入有效评论!')
            return;
        }
        // tslint:disable-next-line:no-console
        // console.log(`onSubmit comment: ${comment}`);
        // this.submitComment(comment);
        if (comment) {
            this.submitComment(comment);
        }
    }

    private submitComment = (comment: string) => {
        const requestUrl = AppConstants.EV_HOT_NEWS_BASE_URL + 'post-app-comment';
        const commentData = {
            user_id: this.props.userId,
            token: this.props.token,
            comment
        };
        fetch(requestUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentData)
        }).then(response => response.json())
        .then(jsonResp => {
            // tslint:disable-next-line:no-console
            // console.log(jsonResp);
            if (jsonResp.msg === 'ok') {
                Toast.info('恭喜，评论成功!');
                /* if (this.textInput.current) {
                    this.textInput.current.clearInput();
                } */
                if (this.mTextInput) {
                    this.mTextInput.clearInput();
                }
            } else {
                Toast.info('抱歉，评论失败了!联系管理员吧!');
            }
        });
    }

    public render() {
        const listHeader = <div className="SelfCenter-comment-header">
                              <div>发表评论</div>
                              <div className="SelfCenter-comment-more">
                                 <Link to={{
                                    pathname:'/'
                                 }}>更多评论</Link>
                              </div>
                           </div>
        return (
            <div className="SelfCenter">
                <div className="SelfCenter-info">
                    <List renderHeader={'个人中心'}>
                        <TextareaItem
                            value={this.props.userId}
                            title="用户ID"
                            disabled/>
                        <TextareaItem
                            title="昵称"
                            editable={false}
                            value={this.props.userNickName}/>
                        <TextareaItem
                            value={this.props.userAccount}
                            title="联系方式"
                            disabled/>
                        <TextareaItem 
                            title="用户等级"
                            value={this.props.userLevel >=AppConstants.EV_HOT_NEWS_USER_THRESH?'普通用户':'管理员'}
                            disabled />
                    </List>
                </div>

                <div className="SelfCenter-comment">
                    <List renderHeader={listHeader}>
                        <TextareaItem
                            ref={(el: any) => this.mTextInput = el}
                            placeholder={'天空虽不曾留下痕迹，但我已飞过...'}
                            rows={5}
                            count={100} />
                        <List.Item>
                            <Button type="primary" size="large" inline onClick={() => this.onSubmit()}>提交</Button>
                        </List.Item>
                    </List>
                </div>
                <div className="SelfCenter-footer">
                    <CopyRightFooter />
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state: AppConstants.IAppState):SelfCenter.IProps => {
    return {
        userId: state.userId,
        userNickName: state.userNickName,
        userAccount: state.userAccount,
        userLevel: state.userLevel,
        token: state.token
    }
};

const SelfCenterContainer = connect(mapStateToProps, null)(SelfCenter);
export default SelfCenterContainer;