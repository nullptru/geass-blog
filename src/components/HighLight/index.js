import React from 'react';
import ReactDOM from 'react-dom';

class HightLight extends React.PureComponent {
  componentDidMount() {
    /* eslint-disable no-undef */
    if (!window.hljs) { throw new Error("hightlight.js isn't exist"); }
    window.hljs.initHighlighting();
  }

  componentDidUpdate() {
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
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default HightLight;

