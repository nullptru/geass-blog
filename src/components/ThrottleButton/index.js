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
      intervalId: undefined,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clear) {
      this.clear();
      this.props.onClear();
    }
  }

  handleClick = () => {
    if (!this.state.disable) {
      const result = this.props.onClick() || true;
      if (result instanceof Promise) {
        result.then((res) => {
          if (!res) {
            this.clear(); // if result is err, then stop tick operation
          }
        });
      }
      if (!result) return;
      this.setState({
        disable: true,
      });
      this.tick();
    }
  };

  tick = () => {
    const remainTime = this.state.remainTime - 1000;// (1000 / 60); // descrease by 1 second
    if (remainTime > 0) {
      const intervalId = setTimeout(this.tick, 1000);
      this.setState({
        remainTime,
        intervalId,
      });
      // requestAnimationFrame(this.tick);
    } else {
      this.props.onResume();
      this.setState({ disable: false, remainTime: this.state.throttleTime });
    }
  }

  clear = () => {
    clearTimeout(this.state.intervalId);
    this.setState({
      intervalId: undefined,
      disable: false,
    });
  }

  render() {
    const {
      onClick, onClear, onResume, clear, className = '', text, throttleTime, ...rest
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
  onResume: PropTypes.func,
  onClear: PropTypes.func,
};

ThrottleButton.defaultProps = {
  throttleTime: 1000 * 60, // 1min
  onClick: () => {},
  onClear: () => {},
  onResume: () => {},
};

export default ThrottleButton;
