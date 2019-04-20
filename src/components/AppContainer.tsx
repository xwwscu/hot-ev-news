import * as React from 'react';
import NewsListContainer from './NewsListContainer';
import CommentsListContainer from './CommentListContainer';
import './../styles/TabBar.css';
import WhiteSpace from 'antd-mobile/lib/white-space';
import 'antd-mobile/lib/white-space/style/css';

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
        sub: '1',
        component: <NewsListContainer />
    },
    {
        title: 'comments',
        sub: '2',
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

    private onTabClick = (newTab:string) => {
        const lastTab = this.state.selectedTab;
        if (lastTab === newTab) {
            return;
        }
        this.setState({
            selectedTab: newTab
        })
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
            </div>
        );
    }
}

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