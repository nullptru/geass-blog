import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { ScrollTop } from 'components';
import dynamic from 'dva/dynamic';
import AdminIndex from './routes/Admin';
import IndexPage from './routes/IndexPage';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`./models/${m}.js`)),
  component,
});

const getRouter = app => ([{
  path: '/',
  name: "geass's blog",
  component: IndexPage,
  children: [{
    path: '/',
    exact: true,
    name: "geass's blog",
    component: dynamicWrapper(app, ['tagsArticles'], () => import('./routes/Home')),
  }, {
    path: '/tags/:tag',
    exact: true,
    name: "geass's blog",
    component: dynamicWrapper(app, ['tagsArticles'], () => import('./routes/Home')),
  }, {
    path: '/tagslist',
    exact: true,
    name: "geass's blog",
    component: dynamicWrapper(app, ['tagsArticles'], () => import('./routes/Tags')),
  }, {
    path: '/article/:id',
    exact: true,
    name: "geass's blog",
    component: dynamicWrapper(app, ['comments'], () => import('./routes/DetailPage')),
  }, {
    path: '/about',
    exact: true,
    name: 'About me',
    component: dynamicWrapper(app, [], () => import('./routes/About')),
  }],
}, {
  path: '/admin',
  exact: true,
  name: 'Blog Admin',
  children: [
    {
      path: '/admin/articles',
      exact: true,
      name: '文章管理',
      component: dynamicWrapper(app, [], () => import('./routes/Admin/Articles')),
    }, {
      path: '/admin/tags',
      exact: true,
      name: '标签管理',
      component: dynamicWrapper(app, [], () => import('./routes/Admin/Tags')),
    },
  ],
}, {
  path: '/iwanttologin',
  exact: true,
  name: 'Admin Login',
  component: dynamicWrapper(app, [], () => import('./routes/Admin/Login')),
}]);

function RouterConfig({ history, app }) {
  const routers = getRouter(app);
  const passProps = {
    routers,
    getRouteData: (path) => {
      return routers.filter(route => route.path === path);
    },
  };

  const [loginRouter] = passProps.getRouteData('/iwanttologin');
  return (
    <Router history={history}>
      <ScrollTop>
        <Switch>
          <Route path="/iwanttologin" component={loginRouter.component} />
          <Route path="/admin" render={props => <AdminIndex {...props} {...passProps} />} />
          <Route path="/" render={props => <IndexPage {...props} {...passProps} />} />
        </Switch>
      </ScrollTop>
    </Router>
  );
}

export default RouterConfig;
