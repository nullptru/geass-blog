import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Switch, Route } from 'dva/router';
import Head from 'components/layout/Head';
import Footer from 'components/layout/Footer';
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
            <Route path="/article/:id" exact render={props => <ArticleDetail {...props} article={article} />} />
          </Switch>
        </div>
        <Footer copyright="@CopyRight Blog of Burgess" />
      </div>
    );
  }
}

IndexPage.propTypes = {
  articles: PropTypes.object.isRequired,
};

export default connect(({ articles }) => ({ articles }))(IndexPage);
