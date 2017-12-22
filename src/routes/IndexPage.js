import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Switch, Route } from 'dva/router';
import { Head, Footer, Live2D } from 'components';
import './IndexPage.less';

class IndexPage extends React.PureComponent {
  getChildContext() {
    const { routers, getRouteData } = this.props;
    return { routers, getRouteData };
  }

  render() {
    const { articles, getRouteData, location } = this.props;
    const headItems = [{
      key: '/',
      title: 'HOME',
    }, {
      key: '/tagslist',
      title: 'TAGS',
    }, {
      key: '/about',
      title: 'ABOUT',
    }];

    const { article } = articles;
    const [routers] = getRouteData('/');
    return (
      <div id="app">
        <Head items={headItems} article={article} location={location} />
        <div className="container">
          <Switch>
            {routers.children.map(route => <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />)}
          </Switch>
        </div>
        <Live2D />
        <Footer copyright="@CopyRight 2017 Blog of Geass" />
      </div>
    );
  }
}

IndexPage.propTypes = {
  articles: PropTypes.object.isRequired,
};

IndexPage.childContextTypes = {
  routers: PropTypes.array,
  getRouteData: PropTypes.func,
};

export default connect(({ articles }) => ({ articles }))(IndexPage);
