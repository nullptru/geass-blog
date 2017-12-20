import React from 'react';
import './index.less';

const Icon = (props) => {
  const { type, className = '', ...rest } = props;
  const classList = ['anticon', 'icon', `icon-${type}`, className];
  return <i {...rest} className={classList.join(' ')} />;
};

export default Icon;
