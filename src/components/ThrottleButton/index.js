import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

class ThrottleButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      disable: false,
      throttleTime: props.throttleTime,
      remainTime: props.throttleTime,
    };
  }

  handleClick = () => {
    if (!this.state.disable) {
      this.setState({
        disable: true,
      });
      this.tick();
      this.props.onClick();
    }
  };

  tick = () => {
    const remainTime = this.state.remainTime - 1000;// (1000 / 60); // descrease by 1 second
    this.setState({
      remainTime,
    });
    if (remainTime > 0) {
      setTimeout(this.tick, 1000);
      // requestAnimationFrame(this.tick);
    } else {
      this.setState({ disable: false, remainTime: this.state.throttleTime });
    }
  }

  render() {
    const {
      onClick, className = '', text, throttleTime, ...rest
    } = this.props;
    const { disable, remainTime } = this.state;
    const classList = [styles.button].concat(className).concat(disable ? styles.disable : '');

    return (<a
      className={classList.join(' ')}
      onClick={this.handleClick}
      {...rest}
    >
      {disable ? `${(remainTime / 1000).toFixed(0)}s` : text}
    </a>);
  }
}

ThrottleButton.propTypes = {
  throttleTime: PropTypes.number,
  onClick: PropTypes.func,
};

ThrottleButton.defaultProps = {
  throttleTime: 1000 * 60, // 1min
  onClick: () => {},
};

export default ThrottleButton;
