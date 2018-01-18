import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

class Dialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
    this.onConfirm.bind(this);
    this.onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }

  onConfirm = () => {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    } else {
      this.setState({ visible: false });
    }
  }

  onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    } else {
      this.setState({ visible: false });
    }
  }

  render() {
    const {
      children, footer, title,
    } = this.props;
    return this.state.visible ? (
      <div className={styles.dialogWrapper}>
        <div className={styles.dialog}>
          <header className={styles.dialogHeader}>
            {title}
          </header>
          <section className={styles.dialogBody}>
            {children}
          </section>
          <section className={styles.dialogFooter}>
            {footer || (
              <React.Fragment>
                <button onClick={this.onConfirm}>确定</button>
                <button onClick={this.onCancel}>取消</button>
              </React.Fragment>
            )}
          </section>
        </div>
      </div>
    ) : '';
  }
}

Dialog.propTypes = {
  title: PropTypes.any,
  children: PropTypes.any,
  footer: PropTypes.element,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
};

Dialog.defaultProps = {
  title: '',
  visible: true,
  children: [],
  footer: undefined,
  onConfirm: undefined,
  onCancel: undefined,
};

export default Dialog;
