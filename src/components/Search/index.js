import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onSearch = () => {
    this.props.onSearch(this.state.query);
  }

  onChange = (e) => {
    this.setState({ query: e.target.value });
  }

  onKeyDown = (e) => { // listen keydown event of 'enter'
    if (e.key.toLocaleLowerCase() === 'enter') {
      this.onSearch();
    }
  }

  render() {
    const { withBox } = this.props;
    return (
      <div className={`${styles.search} ${withBox && styles.box}`}>
        <div className={styles.input}>
          <input type="text" placeholder="Search..." value={this.state.query} className={styles.searchInput} onKeyDown={this.onKeyDown} onChange={this.onChange} />
          <i className={`${styles.searchIcon} icon iconfont icon-search`} onClick={this.onSearch} />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  withBox: PropTypes.bool,
  onSearch: PropTypes.func,
  query: PropTypes.string,
};

Search.defaultProps = {
  withBox: false,
  query: '',
  onSearch: () => {},
};
