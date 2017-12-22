import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { ScrollTop } from 'components';
import IndexPage from './routes/IndexPage';
import AdminIndex from './routes/Admin/index';
import Home from './routes/Home';
import Tags from './routes/Tags';
import About from './routes/About';
import ArticleDetail from './routes/DetailPage';

const routers = [{
  path: '/admin',
  name: '后台管理',
  component: AdminIndex,
}, {
  path: '/',
  name: "geass's blog",
  component: IndexPage,
  children: [{
    path: '/',
    exact: true,
    name: "geass's blog",
    component: Home,
  }, {
    path: '/tags/:tag',
    exact: true,
    name: "geass's blog",
    component: Home,
  }, {
    path: '/tagslist',
    exact: true,
    name: "geass's blog",
    component: Tags,
  }, {
    path: '/article/:id',
    exact: true,
    name: "geass's blog",
    component: ArticleDetail,
  }, {
    path: '/about',
    exact: true,
    name: 'About me',
    component: About,
  }],
}];

const passProps = {
  routers,
  getRouteData: (path) => {
    return routers.filter(route => route.path === path);
  },
};

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <ScrollTop>
        <Switch>
          <Route path="/admin" render={props => <AdminIndex {...props} {...passProps} />} />
          <Route path="/" render={props => <IndexPage {...props} name="test" {...passProps} />} />
        </Switch>
      </ScrollTop>
    </Router>
  );
}

export default RouterConfig;
