import * as React from 'react';
import { Link } from 'react-router-dom';
import { INews } from './../AppConstants';
import './../styles/NewsList.css';

interface INewsListProps {
    news: INews[];
}

export default class NewsList extends React.Component<INewsListProps> {

    public render() {
        const news = this.props.news;
        const newsList = 
            <div style={{display:'flex', flexDirection:'column', flexGrow:1}}>
                {
                    news.map((newsItem, index) => (
                        <Link key={index} to={{
                            pathname: '/news-item',
                            state: newsItem}}>
                            <div key={index} className="News-list-items">
                                <h5 className="News-list-items-title">{newsItem.title}</h5>
                                <h5 className="News-list-items-title-en">{newsItem.title_en}</h5>
                                <div className="News-list-items-desc">
                                    <div className="News-list-items-desc-from">
                                        {newsItem.from}
                                    </div>
                                    <div className="News-list-items-desc-date">
                                        {newsItem.time.substring(0, newsItem.time.indexOf('T'))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
            
        return (
            <div>
                {newsList}
            </div>
        );
    }
}