import * as React from 'react';
import './../styles/NewsItem.css';

interface INewsDetailProps {
    location?: {
        state: string
    },
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

    public componentDidMount() {
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
                });
        } else {
            this.setState({
                pageContent: '加载网页失败了...'
            });
        }
    }

    private createMarkUp() {
        return {__html: this.state.pageContent};
      }

    public render() {
        
        return (
            <div style={{display:'flex', flexDirection:'column', margin:5, padding:3}}>
                <div dangerouslySetInnerHTML={this.createMarkUp()} />
            </div>
        );
    }

}