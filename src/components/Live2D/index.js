import React from 'react';
import ReactDOM from 'react-dom';
import './indexLive2D';

const PIXI = require('pixi.js');

class Live2D extends React.PureComponent {
  componentDidMount() {
    /* eslint-disable */
    const renderer = new PIXI.WebGLRenderer(300, 300, {transparent:true});
    // renderer.backgroundColor = 0x00FFFFFF;
    renderer.view.style.borderRadius = '300px';
    ReactDOM.findDOMNode(this).appendChild(renderer.view);
    const stage = new PIXI.Container();
    const live2dSprite = new PIXI.Live2DSprite(this.modelHaru, {
      debugLog: false,
      randomMotion: false,
      eyeBlink: false,
      // audioPlayer: (...args) => console.log(...args)
    });
    // const sprite = new PIXI.Sprite.fromImage('/7_room2_a.jpg');
    // stage.addChild(sprite);
    stage.addChild(live2dSprite);

    live2dSprite.x = -150;
    // live2dSprite.y = -150;
    live2dSprite.adjustScale(0.3,0.3,0.7);
    live2dSprite.adjustTranslate(0, 0);
    live2dSprite.startRandomMotion('idle');

    live2dSprite.on('click', (evt) => {
      const point = evt.data.global;
      if (live2dSprite.hitTest('body', point.x, point.y)) {
        live2dSprite.startRandomMotionOnce('tap_body');
      }
      if (live2dSprite.hitTest('head', point.x, point.y)) {
        live2dSprite.playSound('星のカケラ.mp3', '/sound/');
      }
    });
    live2dSprite.on('mousemove', (evt) => {
      const point = evt.data.global;
      live2dSprite.setViewPoint(point.x, point.y);
    });

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(stage);
    }
    animate();
  }

  modelHaru = {
    type: 'Live2D Model Setting',
    name: 'haru',
    model: '/haru/haru_01.moc',
    textures:
    [
      '/haru/haru_01.1024/texture_00.png',
      '/haru/haru_01.1024/texture_01.png',
      '/haru/haru_01.1024/texture_02.png',
    ],
    physics: '/haru/haru.physics.json',
    pose: '/haru/haru.pose.json',
    expressions:
    [
      { name: 'f01', file: '/haru/expressions/f01.exp.json' },
      { name: 'f02', file: '/haru/expressions/f02.exp.json' },
      { name: 'f03', file: '/haru/expressions/f03.exp.json' },
      { name: 'f04', file: '/haru/expressions/f04.exp.json' },
      { name: 'f05', file: '/haru/expressions/f05.exp.json' },
      { name: 'f06', file: '/haru/expressions/f06.exp.json' },
      { name: 'f07', file: '/haru/expressions/f07.exp.json' },
      { name: 'f08', file: '/haru/expressions/f08.exp.json' },
    ],
    layout:
    {
      center_x: 0,
      y: 1.2,
      width: 2.9,
    },
    hit_areas:
    [
      { name: 'head', id: 'D_REF.HEAD' },
      { name: 'body', id: 'D_REF.BODY' },
    ],
    motions:
    {
      idle:
      [
        { file: '/haru/motions/idle_00.mtn', fade_in: 2000, fade_out: 2000 },
        { file: '/haru/motions/idle_01.mtn', fade_in: 2000, fade_out: 2000 },
        { file: '/haru/motions/idle_02.mtn', fade_in: 2000, fade_out: 2000 },
      ],
      tap_body:
      [
        { file: '/haru/motions/tapBody_00.mtn', sound: '/haru/sounds/tapBody_00.mp3' },
        { file: '/haru/motions/tapBody_01.mtn', sound: '/haru/sounds/tapBody_01.mp3' },
        { file: '/haru/motions/tapBody_02.mtn', sound: '/haru/sounds/tapBody_02.mp3' },
      ],
      pinch_in:
      [
        { file: '/haru/motions/pinchIn_00.mtn', sound: '/haru/sounds/pinchIn_00.mp3' },
      ],
      pinch_out:
      [
        { file: '/haru/motions/pinchOut_00.mtn', sound: '/haru/sounds/pinchOut_00.mp3' },
      ],
      shake:
      [
        { file: '/haru/motions/shake_00.mtn', sound: '/haru/sounds/shake_00.mp3', fade_in: 500 },
      ],
      flick_head:
      [
        { file: '/haru/motions/flickHead_00.mtn', sound: '/haru/sounds/flickHead_00.mp3' },
      ],
    },
  };

  render() {
    return <div id="live2d" />
  }
}

export default Live2D;