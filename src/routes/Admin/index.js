import React from 'react';
import { Sider } from 'components';
import { Route, Switch, Redirect } from 'dva/router';
import styles from './index.less';

class AdminIndex extends React.PureComponent {
  render() {
    const { getRouteData } = this.props;
    const [routers] = getRouteData('/admin');
    const items = [
      { title: 'test', key: '/' },
      { title: 'test2', key: '/test' },
    ];
    return (
      <div className={styles.container}>
        <Sider items={items} />
        <div>
          <Switch>
            {routers.children.map(route => <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />)}
            <Redirect from="/admin" to="/admin/articles" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default AdminIndex;
