import * as React from 'react';
import { Link } from 'react-router-dom';
import './../styles/NewsItem.css';

interface INewsDetailProps {
    location?: {
        state: string
    }
}

interface INewsDetailState {
    pageContent: string;
}

export default class NewsDetail extends React.Component<INewsDetailProps, INewsDetailState> {

    constructor(props: INewsDetailProps) {
        super(props);
        this.state = {
            pageContent: ''
        }
    }

    public componentWillMount() {
        const locationData = this.props.location;
        if (locationData && locationData.state) {
            const requestUrl = locationData.state;
            // tslint:disable-next-line:no-console
            console.log(requestUrl);
            fetch(requestUrl, {
                method: 'GET',
                mode: 'no-cors'})
                .then(response => response.json())
                .then((jsonResp) => {
                    // tslint:disable-next-line:no-console
                    console.log(jsonResp);
                    this.setState({
                        pageContent: jsonResp.pageContent
                    })
                }).catch (error => 
                    this.setState({
                        pageContent: '<h5>sorry~加载网页失败了...</h5>'
                    })
                );
        } else {
            this.setState({
                pageContent: '<h5>阿拉也不知道去哪里哇~</h5>'
            });
        }
    }

    private createMarkUp() {
        return {__html: this.state.pageContent};
      }

    public render() {
        return (
            <div style={{display:'flex', flexDirection:'column', margin:5, padding:3}}>
                <Link style={{marginLeft:12, marginTop:8, color:"green"}} 
                    to="/">
                    返回主页
                </Link>
                <div style={{marginTop:10, minHeight:100, textAlign:"center"}} dangerouslySetInnerHTML={this.createMarkUp()} />
            </div>
        );
    }

}