import React from 'react';
import ReactDOM from 'react-dom';
import './indexLive2D';
import { modelMorakumo, modelHaru, modelShizuku, modelMiku, modelHaruto } from './models';

const PIXI = require('pixi.js');

class Live2D extends React.PureComponent {
  componentDidMount() {
    /* eslint-disable */
    const renderer = new PIXI.WebGLRenderer(300, 350, {transparent:true});
    // renderer.backgroundColor = 0x00FFFFFF;
    // renderer.view.style.borderRadius = '300px';
    ReactDOM.findDOMNode(this).appendChild(renderer.view);
    const stage = new PIXI.Container();
    const { model, config } = this.getModel();
    const live2dSprite = new PIXI.Live2DSprite(model, {
      debugLog: false,
      randomMotion: false,
      eyeBlink: false,
      // audioPlayer: (...args) => console.log(...args)
    });
    // const sprite = new PIXI.Sprite.fromImage('/7_room2_a.jpg');
    // stage.addChild(sprite);
    stage.addChild(live2dSprite);

    live2dSprite.x = -150;
    live2dSprite.y = -150;
    live2dSprite.adjustScale(config.scaleX, config.scaleY, config.scaleZ);
    live2dSprite.adjustTranslate(config.translateX, config.translateY);
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

  getModel = () => {
    const models = [ modelMorakumo, modelHaru, modelShizuku, modelMiku, modelHaruto ];
    const date = new Date();
    return models[date.getDay() % 5];
  }

  render() {
    return <div id="live2d" />
  }
}

export default Live2D;