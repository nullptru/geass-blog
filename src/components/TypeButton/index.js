import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import styles from './index.less';

export default class TypeButton extends React.PureComponent {
  onClick() {
    this.props.onClick();
  }

  render() {
    const {
      item, to, type, commonLink, ...rest
    } = this.props;
    const classList = [styles.typeButton];
    classList.push(styles[type]);
    const dom = commonLink ? <a className={classList.join(' ')} href={to} key={item.value} onClick={this.onClick.bind(this)} {...rest} >{item.name}</a>
      : <Link className={classList.join(' ')} to={to} key={item.value} onClick={this.onClick.bind(this)} {...rest} >{item.name}</Link>;

    return dom;
  }
}

TypeButton.propTypes = {
  item: PropTypes.object,
  to: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  commonLink: PropTypes.bool,
};

TypeButton.defaultProps = {
  item: {},
  to: '/',
  type: 'default',
  onClick: () => {},
  commonLink: false,
};

