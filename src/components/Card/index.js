import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Card extends React.PureComponent {
  render() {
    const {
      title, children, footer, className, ...rest
    } = this.props;
    const classList = [styles.card].concat(className);
    return (
      <section className={classList.join(' ')} {...rest}>
        {title && <header><span className={styles.header}>{ title }</span></header>}
        <div className={styles.container}>
          { children }
        </div>
        { footer && <div>{footer}</div> }
      </section>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  footer: PropTypes.any,
};

Card.defaultProps = {
  title: undefined,
  footer: undefined,
  className: '',
};
