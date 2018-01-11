import React from 'react';
import { Sider } from 'components';
import { connect } from 'dva';
import { Route, Switch, Redirect, routerRedux } from 'dva/router';
import styles from './index.less';

class AdminIndex extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick = (key) => {
    this.props.dispatch(routerRedux.push({
      pathname: key,
    }));
  }
  render() {
    const { getRouteData } = this.props;
    const [routers] = getRouteData('/admin');
    const items = [
      { title: '文章管理', key: '/admin/articles' },
      { title: '标签管理', key: '/admin/tags' },
    ];
    return (
      <div className={styles.container}>
        <Sider items={items} onMenuClick={this.handleMenuClick} />
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

export default connect()(AdminIndex);
