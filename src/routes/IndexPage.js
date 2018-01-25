import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Head, Footer, Live2D, Icon, ErrorBoundary } from 'components';
import styles from './IndexPage.less';

class IndexPage extends React.PureComponent {
  getChildContext() {
    const { routers, getRouteData } = this.props;
    return { routers, getRouteData };
  }

  getPageTitle = (article) => {
    let title = 'Geass Blog';
    if (article.title) {
      title = `${article.title}-Geass Blog`;
    } else {
      switch (this.props.location.pathname) {
        case '/':
          break;
        case '/tagslist': title = 'Tags-Geass Blog'; break;
        case '/about': title = 'About-Geass Blog'; break;
        default:
          break;
      }
    }
    return title;
  }

  handleError = (err, errInfo) => {
    // eslint-disable-next-line
    const ua = navigator.appVersion;
    this.props.dispatch({
      type: 'app/errorHandle',
      payload: {
        errInfo: `${err.name}：${err.message}`,
        stack: errInfo.componentStack,
        ua,
      },
    });
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
      <ErrorBoundary onError={this.handleError} >
        <DocumentTitle title={this.getPageTitle(article)}>
          <div id="app">
            <Head items={headItems} article={article} location={location} />
            <div className="container">
              <Switch>
                {routers.children.map(route => <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />)}
              </Switch>
            </div>
            <Live2D />
            <Footer copyright="@CopyRight 2017 Blog of Geass">
              <div className={styles.footerIcon}>
                <a href="https://github.com/nullptru"><Icon type="github" /></a>
                <a href="https://twitter.com/nullptru"><Icon type="twitter" /></a>
              </div>
            </Footer>
          </div>
        </DocumentTitle>
      </ErrorBoundary>
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
