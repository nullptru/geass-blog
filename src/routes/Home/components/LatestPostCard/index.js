import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import { Link } from 'dva/router';
import styles from './index.less';

export default class LatestPostCard extends React.PureComponent {
  render() {
    const { latestPosts } = this.props;
    return (
      <Card title="Latest Posts">
        { latestPosts.map(item => (
          <div className={styles.item} key={item.title}>
            <Link to={`/article/${item.id}`}>{ item.title }</Link>
          </div>
        )) }
      </Card>
    );
  }
}

LatestPostCard.propTypes = {
  latestPosts: PropTypes.array,
};

LatestPostCard.defaultProps = {
  latestPosts: [],
};

