import React from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import PropTypes from 'prop-types';
import Menu from '../Menu';
import styles from './index.less';
import bg from '../../../assets/bg.jpg';
import bgAbout from '../../../assets/bg_about.jpg';

class Head extends React.PureComponent {
  constructor(props) {
    super(props);

    this.title = {
      '/': {
        title: 'Stay Hungry, Stay Foolish',
        subtitle: 'Geass Blog',
        bg,
      },
      '/tagslist': {
        title: 'All Tags',
        subtitle: '',
        bg,
      },
      '/about': {
        title: 'About Me',
        subtitle: '',
        bg: bgAbout,
      },
    };
  }

  onMenuClick = (key) => {
    this.props.dispatch(routerRedux.push({
      pathname: key,
    }));
  };

  getDefaultActiveKey = (path) => {
    switch (path) {
      case '/':
      case '/tagslist':
      case '/about': return path;
      default: return undefined;
    }
  };

  render() {
    const {
      items, article, location, tagsList = [],
    } = this.props;
    const headTitle = { ...this.title };
    const match = location.pathname.match(/\/tags\/(.*)/);
    let selectedTag = '';
    if (match) {
      [, selectedTag] = match;
    }
    const tag = tagsList.filter(item => item.value === selectedTag)[0] || {};
    headTitle[`/tags/${selectedTag}`] = {
      title: 'Tag',
      subtitle: tag.name,
      bg,
    };
    const currentTitle = headTitle[location.pathname] || { bg };
    const defaultActiveKey = this.getDefaultActiveKey(location.pathname);
    return (
      <header className={styles.header} style={{ backgroundImage: `url(${article.imageUrl === undefined ? currentTitle.bg : article.imageUrl})` }}>
        <nav>
          <section className={styles.left}>
            <Link className={styles.logo} to="/">废宅的小窝</Link>
          </section>
          <section className={styles.right}>
            <Menu items={items} onClick={this.onMenuClick.bind(this)} defaultActiveKey={defaultActiveKey || items[0].key} hasBackground={false} />
          </section>
        </nav>
        <div className={styles.headTitle}>
          { article.title === undefined &&
          <div>
            <span className={styles.title}>{currentTitle.title || ''}</span>
            <span className={styles.subtitle}>{currentTitle.subtitle || ''}</span>
          </div>}
        </div>
      </header>
    );
  }
}

Head.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.array,
  article: PropTypes.object,
};

Head.contextTypes = {
  routers: PropTypes.array,
  getRouteData: PropTypes.func,
};

Head.defaultProps = {
  article: {},
  items: [{
    key: '/',
    title: 'Home',
  }, {
    key: '/articles',
    title: 'Article',
  }, {
    key: '/about',
    title: 'About',
  }],
};

export default connect(state => ({
  tagsList: state.tags.list,
}))(Head);
