import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const Dialog = ({
  children, footer, onConfirm, onCancel, title,
}) => {
  return (
    <div className={styles.dialogWrapper}>
      <div className={styles.dialog}>
        <header>
          {title}
        </header>
        <section className={styles.dialogBody}>
          {children}
        </section>
        <section className={styles.dialogFooter}>
          {footer || (
            <React.Fragment>
              <button onClick={onConfirm}>确定</button>
              <button onClick={onCancel}>取消</button>
            </React.Fragment>
          )}
        </section>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  title: PropTypes.any,
  children: PropTypes.element,
  footer: PropTypes.element,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

Dialog.defaultProps = {
  title: '',
  children: [],
  footer: undefined,
  onConfirm: () => {},
  onCancel: () => {},
};

export default Dialog;
