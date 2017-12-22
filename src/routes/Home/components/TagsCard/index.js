import React from 'react';
import PropTypes from 'prop-types';
import { Card, TypeButton } from 'components';

export default class TagsCard extends React.PureComponent {
  render() {
    const { tags } = this.props;
    return (
      <Card title="Tags">
        { tags.map(item => (
          <TypeButton key={item.value} item={item} to={`/tags/${item.value}`} type="tag" />
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

