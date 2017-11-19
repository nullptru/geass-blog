import React from 'react';
import { connect } from 'dva';
import { Switch, Route } from 'dva/router';
import Head from 'components/layout/Head';
import Footer from 'components/layout/Footer';
import TypeButton from 'components/TypeButton';
import Home from './Home';
import './IndexPage.less';

function IndexPage() {
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
          <TypeButton text="技术开发" to="/" />
          <TypeButton text="心灵路程" to="/" />
          <TypeButton text="随笔" to="/" />
        </div>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <Footer copyright="@CopyRight Blog of Burgess" />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
