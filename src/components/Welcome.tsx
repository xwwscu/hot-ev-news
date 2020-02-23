import * as React from 'react';
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import '../styles/Welcome.css';
import splashImgUrl from '../assets/splash.jpg';

// tslint:disable-next-line:no-namespace
namespace SplashComponent {
    export interface IProps {
        visible: boolean;
        onSplashClosed: () => void;
    }
    export interface IState {
        visible: boolean;
        timeLeft: number;
    }
}

export default class SplashComponent extends React.Component<SplashComponent.IProps, SplashComponent.IState> {

    private intervalId: NodeJS.Timeout;

    constructor(props: SplashComponent.IProps) {
        super(props);
        this.state = {
            visible: props.visible,
            timeLeft: 3
        };
    }

    public componentWillMount() {
        if (!this.state.visible) {
            return;
        }
        this.intervalId = setInterval(() => {
            let currentLeft = this.state.timeLeft - 1;
            if (currentLeft <= 0) {
                currentLeft = 0;
                this.onClosed();
            } else {
                this.setState({
                    timeLeft: currentLeft
                });
            }
        }, 1000);
    }

    public componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    private onClosed() {
        this.setState({visible: false});
        clearInterval(this.intervalId);
        this.props.onSplashClosed();
    }

    private onClicked() {
        this.onClosed();
        const w = window.open('about:blank');
        if (w) {
            w.location.href = 'https://voice.baidu.com/act/newpneumonia/newpneumonia/';
        }
    }

    public render() {
        const titleStr='相信未来！';
        const imgAltStr ='疫情终将过去! 春天必会到来!'
        /* const imgStyle = {
            width: '270px',
            height: '325px',
            backgroundImage: 'url(' + splashImgUrl + ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            color: 'black',
            fontWeight: 800,
            fontStyle: 'italic'
          } */
          
        return (
            <Modal
                visible={this.state.visible}
                transparent
                title={null}
                footer={[{text:`关闭(${this.state.timeLeft}s)`, onPress: () => this.onClosed()}]}>
                <div className="splash-content" onClick={() => this.onClicked()}>
                    <img className="splash-image" src={splashImgUrl} alt={imgAltStr}/>
                    <div className="splash-title">{titleStr}</div>
                </div>
            </Modal>
        );
    }
}