import React from 'react';
import ReactDOM from 'react-dom';

class HightLight extends React.PureComponent {
  constructor(props) {
    super(props);
    /* eslint-disable no-undef */
    if (!window.hljs) { throw new Error("hightlight.js isn't exist"); }
    window.hljs.initHighlighting();
    this.highLight = this.highLight.bind(this);
  }
  componentDidMount() {
    this.highLight();
  }

  componentDidUpdate() {
    this.highLight();
  }

  highLight = () => {
    /* eslint-disable react/no-find-dom-node */
    const dom = ReactDOM.findDOMNode(this);
    const codeDoms = dom.querySelectorAll('pre > code') || [];

    for (let i = 0; i < codeDoms.length; i += 1) {
      /* eslint-disable no-undef */
      window.hljs.highlightBlock(codeDoms[i]);
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default HightLight;

