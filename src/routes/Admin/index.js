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

  componentWillMount() {
    // 查询登陆状态
    this.props.dispatch({
      type: 'login/isLogin',
    });
  }

  handleMenuClick = (key) => {
    this.props.dispatch(routerRedux.push({
      pathname: key,
    }));
  };

  render() {
    const { getRouteData, login } = this.props;
    const [routers] = getRouteData('/admin');
    const items = routers.children.map(item => ({ title: item.name, key: item.path }));
    // 防止为登陆看到数据
    if (!login.isLogin) {
      return null;
    }
    return (
      <div className={styles.container}>
        <Sider items={items} onMenuClick={this.handleMenuClick} />
        <div>
          <Switch>
            {routers.children.map(route => <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />)}
            <Redirect from="/admin" to={routers.children[0].path} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(({ login }) => ({ login }))(AdminIndex);
