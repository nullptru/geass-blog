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

  const article = {
    id: 'fasdfadf',
    type: {
      label: '心灵路程',
      value: 'heart',
    },
    createdTime: '2017-08-31',
    title: '这是一篇文章标题哦这是一篇文',
    content: '喜欢小楚！',
    abstraction: '如果你无法简洁的表达你的想法，那只说明你还不够了解它。好きな気持ちはどうしても隠しできません〜好きで好きでたまらない〜 -- 阿尔伯特·爱因斯坦',
    tags: [
      {
        label: '心情',
        value: 'emotion',
      },
    ],
    image_url: '#',
  };

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
