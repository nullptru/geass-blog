import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    const { pagination } = props;
    this.state = {
      current: pagination.current,
      total: pagination.total,
      pageSize: pagination.pageSize,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.pagination);
  }

  onSelect(page) {
    this.setState({ current: page }, () => {
      this.props.onSelect(this.state);
    });
  }

  render() {
    const { current, total, pageSize } = this.state;
    const pageCount = Math.ceil(total / pageSize);
    const pageItems = [];
    // before
    if (current !== 1) {
      pageItems.push(<li key="pre" className={`${styles.paginationItem} previous`} onClick={this.onSelect.bind(this, current - 1)}><a>Previous</a></li>);
    }
    // pages
    for (let i = 1; i <= pageCount; i += 1) {
      pageItems.push(<li key={i} className={`${current === i ? styles.active : ''}`} onClick={this.onSelect.bind(this, i)}><a>{i}</a></li>);
    }
    // next page
    if (current !== pageCount) {
      pageItems.push(<li key="next" className={`${styles.paginationItem} next`} onClick={this.onSelect.bind(this, current + 1)}><a>Next</a></li>);
    }
    return (
      <ul className={styles.pagination}>
        {pageItems}
      </ul>
    );
  }
}

Pagination.propTypes = {
  pagination: PropTypes.object,
  onSelect: PropTypes.func,
};

Pagination.defaultProps = {
  pagination: {
    current: 1,
    total: 1,
    pageSize: 10,
  },
  onSelect: () => {},
};
