import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import appStore from './stores/AppStore';
import AppContainer from './components/AppContainer';
// import NewsListContainer from './components/NewsListContainer';
import CommentsListContainer from './components/CommentListContainer';
import NewsItem from './components/NewsItem';
import NewsDetail from './components/NewsDetail';

import './App.css';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">电车快线</h1>
        </header>
        <Provider store={appStore}>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={AppContainer}/>
              <Route exact path="/news-item" component={NewsItem}/>
              <Route exact path="/news-detail" component={NewsDetail}/>
              <Route exact path="/self-center" />
              <Route exact path="/comments" component={CommentsListContainer}/>
            </Switch>
          </HashRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
