import React from 'react';
import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';

const defaultDuration = 3;
const defaultTop = '5%';
let messageInstance;
let key = 1;

function getMessageInstance(callback) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }
  Notification.newInstance({
    transitionName: 'move-up',
    style: { top: defaultTop, left: '50%' }, // 覆盖原来的样式
  }, (instance) => {
    if (messageInstance) {
      callback(messageInstance);
      return;
    }
    messageInstance = instance;
    callback(instance);
  });
}

function notice(content, duration, onClose) {
  if (typeof duration === 'function') {
    onClose = duration;
    duration = defaultDuration;
  }
  key += 1;
  const target = key;
  getMessageInstance((instance) => {
    instance.notice({
      key: target,
      duration,
      style: {},
      content: (
        <div>
          <span>{content}</span>
        </div>
      ),
      onClose,
    });
  });
  return () => {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
}

export default {
  info(content, duration, onClose) {
    return notice(content, duration, onClose);
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
