import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      activeKey: undefined,
    };
  }

  onClick(item) {
    this.props.onClick(item.key, item);
    this.setState({ activeKey: item.key });
  }

  render() {
    const { items } = this.props;
    return (
      <ul className={styles.menu}>
        { items.map(item =>
          (
            <li
              key={item.key}
              className={[this.state.activeKey === item.key ? styles.active : '', styles.menuItem].join(' ')}
              onClick={this.onClick.bind(this, item)}
            >
              {item.title}
            </li>
          ))}
      </ul>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
};

Menu.defaultProps = {
  items: [],
  onClick: () => {},
};
