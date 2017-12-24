import React from 'react';
import styles from './index.less';

export default class Input extends React.PureComponent {
  render() {
    const {
      className, multiple, value = '', ...rest
    } = this.props;
    const dom = multiple ? (
      <textarea
        className={[styles.geassBlogInput, className].join(' ')}
        {...rest}
        value={value}
      />
    ) : (
      <input
        className={[styles.geassBlogInput, className].join(' ')}
        {...rest}
        value={value}
      />
    );
    return dom;
  }
}

