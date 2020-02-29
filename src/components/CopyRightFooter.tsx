import * as React from 'react';

export default class CopyRightFooter extends React.Component {
    public render() {
        const footerStyle: React.CSSProperties = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            fontSize: '12px'
        }
        const itemStyle: React.CSSProperties = {
            flexGrow: 1,
            textAlign: 'center',
            margin: 4
        }
        return (
            <footer style={footerStyle}>
                <div style={itemStyle}>
                    &copy;&nbsp;2020 xww.Byton. All Rights Reserved.
                </div>
                <span style={itemStyle}>
                    <a href='http://beian.miit.gov.cn/publish/query/indexFirst.action' 
                        target="_blank" rel="noopener noreferrer">京ICP备17064036号</a>
                </span>
            </footer>
        );
    }
}