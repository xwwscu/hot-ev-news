import * as React from 'react';
import { Link } from 'react-router-dom';
import { INews } from './../AppConstants';
import CopyRightFooter from './CopyRightFooter';
import './../styles/NewsItem.css';

interface INewsItemProps {
    location?: {
        state: INews
    },
    history?: {
        goBack: () => void
    }
}

export default class NewsItem extends React.Component<INewsItemProps> {

    public render() {
        const locationData = this.props.location;
            // || { state: {}};
        const history = this.props.history;
        const backView = history 
        // tslint:disable-next-line:jsx-no-lambda
        ? <div className="News-item-back" onClick={()=>history.goBack()}>返回</div> 
        : null;
        const detailView = !locationData || !locationData.state.detail_url 
        ? null 
        : <div className="News-item-detail">
            <Link to={{
                pathname: '/news-detail',
                state: locationData.state.detail_url
        }}>阅读原文</Link>
    </div>
        const newsItemView = locationData
            ? <div className="News-item">
                {backView}
                <h5 className="News-item-title">{locationData.state.title}</h5>
                <h5 className="News-item-title-en">{locationData.state.title_en}</h5>
                <div className="News-item-from">{locationData.state.from}</div>
                <div className="News-item-date">{locationData.state.time.substring(0, locationData.state.time.indexOf('T'))}</div>
                <div className="News-item-abstract">{locationData.state.content}</div>
                <div className="News-item-abstract-en">{locationData.state.content_en}</div>
                {detailView}
            </div>
            : <div>出错啦...</div>
        return (
            <div style={{display:'flex', flexDirection:'column'}}>
                {newsItemView}
                <CopyRightFooter />
            </div>
        );
    }

}