import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import styles from './index.less';

export default class TypeButton extends React.PureComponent {
  onClick() {
    this.props.onClick();
  }

  render() {
    const { text, to, type } = this.props;
    const classList = [styles.typeButton];
    classList.push(styles[type]);
    return (
      <Link className={classList.join(' ')} to={to} onClick={this.onClick.bind(this)}>{text}</Link>
    );
  }
}

TypeButton.propTypes = {
  text: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

TypeButton.defaultProps = {
  text: 'PlaceHolder',
  to: '/',
  type: 'default',
  onClick: () => {},
};

