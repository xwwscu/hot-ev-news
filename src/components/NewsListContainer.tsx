import * as React from 'react';
import { connect } from 'react-redux';
import * as AppConstants from './../AppConstants';
import NewsList from './NewsList';

interface IComponentProps {
    hasLogIn: boolean;
    token: string;
    pageNum: number;
}

interface IComponentState {
    news: AppConstants.INews[]
}

class NewsListContainerComponent extends React.Component<IComponentProps, IComponentState> {

    constructor(props: IComponentProps) {
        super(props);
        this.state = {
            news: []
        }
    }

    public componentDidMount() {
        // fetch data
        const pageNum = this.props.pageNum || 1;
        const requestUrl = AppConstants.EV_HOT_NEWS_BASE_URL_DEBUG + 'get-hot?page=' + pageNum;
        // tslint:disable-next-line:no-console
        console.log(requestUrl);
        fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }})
            .then(response => response.json())
            .then((resJson) => {
                // tslint:disable-next-line:no-console
                console.log(resJson);
                this.setState({
                    news: resJson.news
                })
            });
        
    }

    public render() {
        const { news } = this.state;
        return (
            <NewsList news={news} />
        );
    }
}

const mapStateToProps = (state: AppConstants.IAppState) => {
    return {
        hasLogIn: state.hasLogIn,
        token: state.token,
        pageNum: state.pageNum
    }
};

// const mapDispatchToProps;

const NewsListContainer = connect(mapStateToProps, null)(NewsListContainerComponent);
export default NewsListContainer;