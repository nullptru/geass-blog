import React from 'react';

const Icon = (props) => {
  const { type, className = '', ...rest } = props;
  const classList = ['anticon', `anticon-${type}`, className];
  return <i {...rest} className={classList.join(' ')} />;
};

export default Icon;
