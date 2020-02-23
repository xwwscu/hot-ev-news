import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import appStore from './stores/AppStore';
import NaviTopContainer from './components/NaviTopContainer';
import AppContainer from './components/AppContainer';
import SelfCenterContainer from './components/SelfCenterContainer';
import CommentsListContainer from './components/CommentListContainer';
import NewsItem from './components/NewsItem';

class App extends React.Component {
  public render() {
    return (
      <div style={{display:"flex", flexDirection:"column", flexGrow:1}}>
        <Provider store={appStore}>
          <HashRouter>
            <NaviTopContainer />
            <Switch>
              <Route exact path="/" component={AppContainer}/>
              <Route exact path="/news-item" component={NewsItem}/>
              <Route exact path="/self-center" component={SelfCenterContainer}/>
              <Route exact path="/comments" component={CommentsListContainer}/>
            </Switch>
          </HashRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
