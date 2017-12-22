import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { ScrollTop } from 'components';
import IndexPage from './routes/IndexPage';
import AdminIndex from './routes/Admin/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <ScrollTop>
        <Switch>
          <Route path="/admin" exact component={AdminIndex} />
          <Route path="/" component={IndexPage} />
        </Switch>
      </ScrollTop>
    </Router>
  );
}

export default RouterConfig;
