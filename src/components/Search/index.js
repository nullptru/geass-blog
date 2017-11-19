import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Search extends React.PureComponent {
  render() {
    const { withBox } = this.props;
    return (
      <div className={`${styles.search} ${withBox && styles.box}`}>
        <div className={styles.input}>
          <input type="text" placeholder="Search..." className={styles.searchInput} />
          <i className={`${styles.searchIcon} icon iconfont icon-search`} />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  withBox: PropTypes.bool,
};

Search.defaultProps = {
  withBox: false,
};
