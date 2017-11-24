import React from 'react';
import { connect } from 'dva';
import { Switch, Route } from 'dva/router';
import Head from 'components/layout/Head';
import Footer from 'components/layout/Footer';
import TypeButton from 'components/TypeButton';
import Home from './Home';
import ArticleDetail from './DetailPage';
import './IndexPage.less';

function IndexPage({ match, history }) {
  const headItems = [{
    key: 'home',
    title: 'Home',
  }, {
    key: 'article',
    title: 'Article',
  }, {
    key: 'about',
    title: 'About',
  }, {
    key: 'rikka',
    title: 'Rikka',
  }];

  return (
    <div id="app">
      <Head items={headItems} />
      <div className="container">
        <div className="center">
          <TypeButton text="所有" to="/" type="active" />
          <TypeButton text="充电站" to="/type/charging" />
          <TypeButton text="储藏室" to="/type/storeroom" />
          <TypeButton text="心情随想" to="/type/motions" />
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/article/:id" exact render={() => <ArticleDetail article={article} />} />
        </Switch>
      </div>
      <Footer copyright="@CopyRight Blog of Burgess" />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
