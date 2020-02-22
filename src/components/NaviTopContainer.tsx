import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as AppConstants from '../AppConstants';
import ActionGetter from './../actions/ActionGetter';
import './../styles/TabBar.css';
import NavBar from 'antd-mobile/lib/nav-bar';
import 'antd-mobile/lib/nav-bar/style/css';
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import Toast from 'antd-mobile/lib/toast';
import 'antd-mobile/lib/toast/style/css';
import avatarUrl from './../assets/avatar.png';

interface INaviTopProps {
    hasLogIn: boolean;
    toggleLogInSuc: (payload: any) => void;
}

interface INaviTopState {
    hasLogIn: boolean;
}

const mapStateToProps = (state: AppConstants.IAppState) => ({
    hasLogIn: state.hasLogIn
})

const mapDispathToProps = (dispatch: Dispatch) => {
    return {
        toggleLogInSuc: (payload: any) => {
            dispatch(ActionGetter.getLogInSucAction(payload))
        }
    };
}

class NaviTopComponent extends React.Component<INaviTopProps, INaviTopState> {

    constructor(props: INaviTopProps) {
        super(props);
        this.state = {
            hasLogIn: this.props.hasLogIn
        }
    }

    private onClickAvatar = () => {
        if (!this.props.hasLogIn) {
            // need logIn
            Modal.prompt('登陆', '请按要求输入用户名及密码:',
                (login, password) => this.onUserLogIn(login, password),
                'login-password', '',
                ['请输入用户邮箱或手机', '请输入密码'],
            );
            return;
        }
        Toast.info('已登陆!');
    }

    private onUserLogIn = (account: string, pwd?: string) => {
        // tslint:disable-next-line:no-console
        console.log(`login: ${account}, password: ${pwd}`);
        if (!pwd || pwd.length === 0) {
            Toast.info('请输入有效密码!')
            return;
        }
        const logInUrl = AppConstants.EV_HOT_NEWS_BASE_URL + 'user-login';
        const bodyData = {
            name: account,
            pwd,
            token: ''
        };
        fetch(logInUrl, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        }).then(response => response.json())
        .then(jsonResp => {
            // tslint:disable-next-line:no-console
            // console.log(jsonResp);
            this.props.toggleLogInSuc({
                userAccount: account,
                userId: jsonResp.user_id,
                hasLogIn: true,
                userNickName: jsonResp.nick_name,
                token: jsonResp.token,
                userLevel: jsonResp.user_level
            });
            this.setState({
                hasLogIn: true
            });
            Toast.info('登陆成功!');
        });
    }
    
    public render() {
        const hasLogIn = this.props.hasLogIn || this.state.hasLogIn;
        let rightBarView =  <div onClick={this.onClickAvatar}>
                                <span className="App-TopNav-avatar" style={{backgroundImage: `url(${avatarUrl})`}} />
                            </div>;
        if (hasLogIn) {
            rightBarView =  <Link to="/self-center">
                                <span className="App-TopNav-avatar" style={{backgroundImage: `url(${avatarUrl})`}} />
                            </Link>
        }
        return (
            <div className="App-TopNav">
                <NavBar
                    mode='dark'
                    rightContent={
                        rightBarView
                    }>
                    EVNews
                </NavBar>
            </div>
        );
    }
}

const NaviTopContainer = connect(mapStateToProps, mapDispathToProps)(NaviTopComponent);

export default NaviTopContainer;