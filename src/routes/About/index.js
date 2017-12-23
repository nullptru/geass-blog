import React from 'react';
import ReactMarkdown from 'react-markdown';
import { HighLight } from 'components';

export default () => {
  const content = '> 人生は一度きりなんです、がっついていこう \n\n先给自己贴标签： 伪二次元、前端新手、拖延癌、日常咸鱼....\n\n虽然是个咸鱼却总想着搞事情，看了下时间，没错，还可以自称为应届大学生。\n\n博客的日常应该是主要分享一些技术上的想法和学习的记录，穿插一些日常生活的感悟和一些杂七杂八的东西。\n\n希望自己能够催促自己保持博客的活力，也欢迎交流各种问题～\n\n联系方式就先丢个QQ：1006755794\n\nGithub：[传送门](https://github.com/nullptru)';
  return (
    <div className="row" style={{ color: 'black', fontSize: '16px', margin: '24px auto', minHeight: '420px' } }>
      <div className="col-md-8 col-sm-12 col-md-push-2">
        <HighLight>
          <ReactMarkdown source={content} escapeHtml={false} />
        </HighLight>
      </div>
    </div>
  );
};
