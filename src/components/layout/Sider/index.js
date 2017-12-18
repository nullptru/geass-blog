import React from 'react';
import Menu from '../Menu';
import styles from './index.less';

export default class Sider extends React.PureComponent {
  render() {
    const { items } = this.props;
    return (
      <div className={styles.sider}>
        <div className={styles.logo}>Geass Blog</div>
        <Menu items={items} mode="verticle" />
      </div>
    );
  }
}
