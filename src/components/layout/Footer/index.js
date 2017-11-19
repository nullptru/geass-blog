import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const Footer = ({ copyright, children }) => {
  return (
    <section className={styles.footer}>
      { children }
      <span>{copyright}</span>
    </section>
  );
};

Footer.propTypes = {
  children: PropTypes.any,
  copyright: PropTypes.string,
};

Footer.defaultProps = {
  children: [],
  copyright: 'No CopyRight',
};

export default Footer;
