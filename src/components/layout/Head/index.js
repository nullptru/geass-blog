import React from 'react';
import PropTypes from 'prop-types';
import Menu from '../Menu';
import styles from './index.less';
import bg from '../../../assets/bg.jpg';

export default class Head extends React.PureComponent {
  render() {
    const { items } = this.props;
    return (
      <header className={styles.header}>
        <img className={styles.bgImage} src={bg} alt="bg" />
        <nav>
          <section className={styles.left}>
            <a className={styles.logo} href="/">废宅的小窝</a>
          </section>
          <section className={styles.right}>
            <Menu items={items} />
          </section>
        </nav>
      </header>
    );
  }
}

Head.propTypes = {
  items: PropTypes.array,
};

Head.defaultProps = {
  items: [{
    key: 'home',
    title: 'Home',
  }, {
    key: 'article',
    title: 'Article',
  }, {
    key: 'about',
    title: 'about',
  }],
};
