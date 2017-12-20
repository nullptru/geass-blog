import React from 'react';
import { Sider } from 'components';
import ArticleAdmin from './Articles';
import styles from './index.less';

class AdminIndex extends React.PureComponent {
  render() {
    const items = [
      { title: 'test', key: '/' },
      { title: 'test2', key: '/test' },
    ];
    return (
      <div className={styles.container}>
        <Sider items={items} />
        <div>
          <ArticleAdmin />
        </div>
      </div>
    );
  }
}

export default AdminIndex;
