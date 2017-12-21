import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Switch, Route } from 'dva/router';
import { Head, Footer, Live2D } from 'components';
import { CSSTransition } from 'react-transition-group';
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
      <CSSTransition
        timeout={1000}
        classNames="fade"
      >
        <div id="app">
          <Head items={headItems} article={article} />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} location={this.props.location} />
              <Route path="/tags/:tag" exact component={Home} location={this.props.location} />
              <Route path="/article/:id" exact render={props => <ArticleDetail {...props} article={article} location={this.props.location} />} />
            </Switch>
          </div>
          <Live2D />
          <Footer copyright="@CopyRight 2017 Blog of Geass" />
        </div>
      </CSSTransition>
    );
  }
}

IndexPage.propTypes = {
  articles: PropTypes.object.isRequired,
};

export default connect(({ articles }) => ({ articles }))(IndexPage);
