import React from 'react';
import styles from './index.less';

export default class Input extends React.PureComponent {
  render() {
    const { className, ...rest } = this.props;
    return <input className={[styles.geassBlogInput, className].join(' ')} {...rest} />;
  }
}

