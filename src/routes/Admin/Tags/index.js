import React from 'react';
import { connect } from 'dva';
import { Icon, Card } from 'components';
import TagCard from './AdminTagCard';
import styles from './index.less';

class TagAdmin extends React.PureComponent {
  addNewTags = () => {

  };

  render() {
    const { tagList } = this.props;
    const addTagClassList = [styles.tagCard, styles.addContainer];

    return (
      <div className={styles.tagsContainer}>
        { tagList.map(tag => <TagCard key={tag.id} tag={tag} />)}
        <Card className={addTagClassList.join(' ')} onClick={this.addNewTags}>
          <Icon type="plus" />
        </Card>
      </div>
    );
  }
}

export default connect(({ tags: { list: tagList } }) => ({ tagList }))(TagAdmin);
