import React from 'react';
import ReactMarkdown from 'react-markdown';
import { HighLight } from 'components';

export default () => {
  const content = "\n# Live demo\n\nChanges are automatically rendered as you type.\n\n* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)\n* Renders actual, \"native\" React DOM elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n\n## HTML block below\n\n<blockquote>\n  This blockquote will change based on the HTML settings above.\n</blockquote>\n\n## How about some code?\n```js\nvar React = require('react');\nvar Markdown = require('react-markdown');\n\nReact.render(\n  <Markdown source=\"# Your markdown here\" />,\n  document.getElementById('content')\n);\n```\n\nPretty neat, eh?\n\n## Tables?\n\n| Feature | Support |\n| ------ | ----------- |\n| tables | ✔ |\n| alignment | ✔ |\n| wewt | ✔ |\n\n## More info?\n\nRead usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n\n---------------\n\nA component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal\n";
  return (
    <div className="row" style={{ color: 'black' }}>
      <div className="col-md-8 col-sm-12 col-md-push-2">
        <HighLight>
          <ReactMarkdown source={content} escapeHtml={false} />
        </HighLight>
      </div>
    </div>
  );
};
