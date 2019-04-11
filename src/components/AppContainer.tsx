import * as React from 'react';
import { WhiteSpace, TabBar } from 'antd-mobile';
import NewsListContainer from './NewsListContainer';
import CommentsListContainer from './CommentListContainer';
import './../styles/TabBar.css';

// tslint:disable-next-line:no-namespace
namespace AppContainer {
    export interface IProps {
        initTab?: string;
    }
    export interface IState {
        selectedTab: string;
    }
}

const TabsData = [
    {
        title: 'hot-news',
        component: <NewsListContainer />
    },
    {
        title: 'comments',
        component: <CommentsListContainer />
    }
]

export default class AppContainer extends React.Component<AppContainer.IProps, AppContainer.IState> {

    constructor(props: AppContainer.IProps) {
        super(props);
        this.state = {
            selectedTab: TabsData[0].title
        }
    }

    /* private renderTabContent(tabString: string=TabsData[0].title) {
        if (tabString === TabsData[1].title) {
            return TabsData[1].component;
        }
        return TabsData[0].component;
    } */

    public render() {

        return (
            <div className="App-tab am-tab-bar-bar am-tab-bar-tab-title">
                <WhiteSpace />
                <TabBar noRenderContent={false} barTintColor="#108ee9" 
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
                        selected={this.state.selectedTab==='hot-news'}>
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
                        selected={this.state.selectedTab==='comments'} >
                        {<CommentsListContainer />}
                    </TabBar.Item>
                </TabBar>
                <WhiteSpace />
            </div>
        );
    }
}