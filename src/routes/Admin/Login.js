import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input } from 'components';
import { createForm } from 'rc-form';
import styles from './index.less';

class Login extends React.PureComponent {
  componentDidUpdate() {
    if (this.props.login.isLogin) {
      /* eslint-disable no-undef */
      window.location = '/admin/articles';
    }
  }

  handleOk = () => {
    this.props.dispatch({ type: 'login/login', payload: { ...this.props.form.getFieldsValue() } });
  }

  render() {
    const {
      form: {
        getFieldDecorator,
      },
    } = this.props;
    return (
      <div className={styles.loginContainer}>
        <div className={styles.form}>
          <div className={styles.logo}>
            Geass Blog
          </div>
          <div className={styles.formItem}>
            {getFieldDecorator('name')(<Input className={styles.smallImput} placeholder="用户名" />)}
          </div>

          <div className={styles.formItem}>
            {getFieldDecorator('password')(<Input className={styles.smallImput} type="password" placeholder="密码" />)}
          </div>
          <button onClick={this.handleOk.bind(this)}>登录</button>
        </div>
      </div>
    );
  }
};

Login.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ login }) => ({ login }))(createForm()(Login));
