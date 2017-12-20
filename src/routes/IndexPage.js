import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Switch, Route } from 'dva/router';
import { Head, Footer, Live2D } from 'components';
import Home from './Home';
import ArticleDetail from './DetailPage';
import './IndexPage.less';

class IndexPage extends React.PureComponent {
  render() {
    const { articles } = this.props;
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

    return (
      <div id="app">
        <Head items={headItems} article={article} />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/type/:type" exact component={Home} />
            <Route path="/tags/:tag" exact component={Home} />
            <Route path="/article/:id" exact render={props => <ArticleDetail {...props} article={article} />} />
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

export default connect(({ articles }) => ({ articles }))(IndexPage);
