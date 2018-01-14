import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input } from 'components';
import { routerRedux } from 'dva/router';
import { createForm } from 'rc-form';
import styles from './index.less';

const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  console.log(login)
  if (login.isLogin) {
    dispatch(routerRedux.push({
      pathname: '/admin/articles',
    }));
  }
  function handleOk() {
    // console.log({ ...getFieldsValue() } )
    dispatch({ type: 'login/login', payload: { ...getFieldsValue() } });
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt="logo" src="/logo_login.png" />
        </div>
        <div className={styles.formItem}>
          {getFieldDecorator('name')(<Input className={styles.smallImput} placeholder="用户名" />)}
        </div>

        <div className={styles.formItem}>
          {getFieldDecorator('password')(<Input className={styles.smallImput} type="password" placeholder="密码" />)}
        </div>
        <div>
          <button onClick={handleOk}>登录</button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ login }) => ({ login }))(createForm()(Login));
