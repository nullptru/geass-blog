import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import Menu from '../Menu';
import styles from './index.less';
import bg from '../../../assets/bg.jpg';

class Head extends React.PureComponent {
  onMenuClick = (key) => {
    this.props.dispatch(routerRedux.push({
      pathname: key,
    }));
  };

  render() {
    const { items, article } = this.props;
    return (
      <header className={styles.header}>
        <div style={{ position: 'relative' }}>
          <img className={styles.bgImage} src={article.img === undefined ? bg : article.img} alt="bg" />
          { article.title === undefined &&
          <div className={styles.headTitle}>
            <span className={styles.title}>Stay Hungry, Stay Foolish</span>
          </div>}
        </div>
        <nav>
          <section className={styles.left}>
            <a className={styles.logo} href="/">废宅的小窝</a>
          </section>
          <section className={styles.right}>
            <Menu items={items} onClick={this.onMenuClick.bind(this)}/>
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

export default connect()(Head);
