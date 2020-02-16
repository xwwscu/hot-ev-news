import * as React from 'react';
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';

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

    public render() {
        return (
            <Modal
                visible={this.state.visible}
                transparent
                title="武汉加油! 中国加油!"
                footer={[{text:`关闭(${this.state.timeLeft}s)`, onPress: () => this.onClosed()}]}>
                <div>
                    <br/>
                    为众人抱薪者，<br/>
                    不可使其冻毙于风雪。<br/>
                    为自由开道者，<br/>
                    不可令其困厄于荆棘。<br/>
                    <br/>
                </div>
            </Modal>
        );
    }
}