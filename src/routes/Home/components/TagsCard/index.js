import React from 'react';
import PropTypes from 'prop-types';
import { Card, Tag } from 'components';

export default class TagsCard extends React.PureComponent {
  render() {
    const { tags } = this.props;
    return (
      <Card title="Latest Posts">
        { tags.map(item => (
          <Tag key={item.label} tag={item} />
        )) }
      </Card>
    );
  }
}

TagsCard.propTypes = {
  tags: PropTypes.array,
};

TagsCard.defaultProps = {
  tags: [],
};

