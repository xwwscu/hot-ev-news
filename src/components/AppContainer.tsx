import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from './../AppConstants';
import ActionGetter from '../actions/ActionGetter';
import SplashComponent from './Welcome';
import NewsListContainer from './NewsListContainer';
import CommentsListContainer from './CommentListContainer';
import './../styles/TabBar.css';
import WhiteSpace from 'antd-mobile/lib/white-space';
import 'antd-mobile/lib/white-space/style/css';

// tslint:disable-next-line:no-namespace
namespace AppContainer {
    export interface IProps {
        initTab?: string;
        hasShownSplash: boolean;
        dispatchShowSplash: (payload: any) => void;
    }
    export interface IState {
        selectedTab: string;
    }
}

const TabsData = [
    {
        title: '热闻',
        sub: '1',
        component: <NewsListContainer />
    },
    {
        title: '心声',
        sub: '2',
        component: <CommentsListContainer />
    }
]

export class AppComponent extends React.Component<AppContainer.IProps, AppContainer.IState> {

    constructor(props: AppContainer.IProps) {
        super(props);
        this.state = {
            selectedTab: TabsData[0].title
        }
    }

    private onTabClick = (newTab:string) => {
        const lastTab = this.state.selectedTab;
        if (lastTab === newTab) {
            return;
        }
        this.setState({
            selectedTab: newTab
        })
    }

    private onSplashClosed = () => {
        this.props.dispatchShowSplash({hasWelcomeShown: true});
    }

    public render() {
        const contentView = 
            this.state.selectedTab === TabsData[0].title 
            ? TabsData[0].component
            : TabsData[1].component;
        
        return (
            <div className="App-tab">
                <div className="App-tab-content">
                    {contentView}
                </div>
                <WhiteSpace />
                <div className="App-tab-bottom-bar">
                    {
                        TabsData.map((tab, index) => (
                            this.state.selectedTab === tab.title ?
                            <div key={index} 
                                className="App-tab-bottom-bar-selected-item"
                                onClick={()=>this.onTabClick(tab.title)}>
                                {tab.title}
                            </div>
                            :
                            // tslint:disable-next-line:jsx-no-lambda
                            <div key={index} 
                                onClick={()=>this.onTabClick(tab.title)}>
                                {tab.title}
                            </div>
                        ))
                    }
                </div>
                <SplashComponent visible={!this.props.hasShownSplash} onSplashClosed={this.onSplashClosed} />
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        hasShownSplash: state.hasWelcomeShown
    };
};

const mapDispatchToProps = (dispach: Dispatch) => {
    return {
        dispatchShowSplash: (payload: any) => {
            dispach(ActionGetter.getUpdateWelcomeAction(payload));
        }
    };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
export default AppContainer;

// className="App-tab am-tab-bar-bar am-tab-bar-tab-title"
{/* <TabBar noRenderContent={false} barTintColor="#108ee9"
    tintColor="#ff0" unselectedTintColor="#fff"
    tabBarPosition='bottom'>
    <TabBar.Item
        title="快线"
        key="hot-news"
        // tslint:disable-next-line:jsx-no-lambda
        onPress={() => {
            this.setState({
                selectedTab: 'hot-news',
            });
        }}
        selected={this.state.selectedTab === 'hot-news'}>
        {<NewsListContainer />}
    </TabBar.Item>
    <TabBar.Item
        title="社区"
        key="comments"
        // tslint:disable-next-line:jsx-no-lambda
        onPress={() => {
            this.setState({
                selectedTab: 'comments',
            });
        }}
        selected={this.state.selectedTab === 'comments'} >
        {<CommentsListContainer />}
    </TabBar.Item>
</TabBar> */}