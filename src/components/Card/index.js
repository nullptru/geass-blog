import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Card extends React.PureComponent {
  render() {
    const { title, children } = this.props;
    return (
      <section className={styles.card}>
        <header><span className={styles.header}>{ title }</span></header>
        <div className={styles.container}>
          { children }
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Card.defaultProps = {
  title: 'title',
};
