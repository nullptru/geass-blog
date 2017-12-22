import React from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import PropTypes from 'prop-types';
import Menu from '../Menu';
import styles from './index.less';
import bg from '../../../assets/bg.jpg';

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
    };
  }

  onMenuClick = (key) => {
    this.props.dispatch(routerRedux.push({
      pathname: key,
    }));
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
    };
    const currentTitle = headTitle[location.pathname] || { bg };
    return (
      <header className={styles.header}>
        <div style={{ position: 'relative' }}>
          <img className={styles.bgImage} src={article.img === undefined ? currentTitle.bg : article.img} alt="bg" />
          { article.title === undefined &&
          <div className={styles.headTitle}>
            <span className={styles.title}>{currentTitle.title}</span>
            <span className={styles.subtitle}>{currentTitle.subtitle}</span>
          </div>}
        </div>
        <nav>
          <section className={styles.left}>
            <Link className={styles.logo} to="/">废宅的小窝</Link>
          </section>
          <section className={styles.right}>
            <Menu items={items} onClick={this.onMenuClick.bind(this)} hasBackground={false} />
          </section>
        </nav>
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
