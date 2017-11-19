import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Article from 'components/ArticleItem';
import Search from 'components/Search';
import Pagination from 'components/Pagination';
import LatestPostCard from './components/LatestPostCard';
import TagsCard from './components/TagsCard';
import styles from './index.less';

const Home = ({ dispatch }) => {
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

  const latestPosts = [
    {
      id: '123',
      title: '这是个近期文章标题',
    },
    {
      id: '1',
      title: '这是个近期文章标题1',
    },
    {
      id: '2',
      title: '这是个近期文章标题2',
    },
    {
      id: '3',
      title: '这是个近期文章标题3',
    },
    {
      id: '4',
      title: '这是个近期文章标题4',
    },
  ];

  const tags = [
    {
      id: '123',
      label: 'JavaScript',
      type: 'primary',
      to: '/',
    },
    {
      id: '1',
      label: 'Node',
      type: 'primary',
      to: '/',
    },
    {
      id: '2',
      label: 'Rikka',
      type: 'lightBlue',
      to: '/',
    },
    {
      id: '3',
      label: 'Vue',
      type: 'lightRed',
      to: '/',
    },
    {
      id: '4',
      label: 'React',
      type: 'lightGreen',
      to: '/',
    },
  ];

  const pagination = {
    current: 1,
    total: 51,
    pageSize: 10,
  };

  const onArticleClick = () => {
    dispatch(routerRedux.push({
      pathname: '/home/article/test',
    }));
  };

  return (
    <div className="row">
      <div className={`col-md-8 col-sm-12 ${styles.colLt8}`}>
        {[1, 2, 3, 4, 5].map(i =>
          <Article article={article} key={i} onClick={onArticleClick} />)}
        <Pagination pagination={pagination} />
      </div>
      <div className="col-md-4 col-sm-12">
        <Search withBox />
        <LatestPostCard latestPosts={latestPosts} />
        <TagsCard tags={tags} />
      </div>
    </div>
  );
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ dispatch }) => ({ dispatch }))(Home);
