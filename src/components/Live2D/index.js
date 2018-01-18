import React from 'react';
import ReactDOM from 'react-dom';
import './indexLive2D';
import { modelMorakumo, modelHaru, modelShizuku, modelMiku, modelHaruto } from './models';
import { throttle } from '../../utils/index';

const PIXI = require('pixi.js');

/* eslint-disable */
class Live2D extends React.PureComponent {
  constructor(props) {
    super(props);
    // add reactive size change to live2D
    window.onresize = throttle(200, () => {
      // resize the canvas size by windows width
      const width = window.innerWidth / 3 > 300 ? 300 : window.innerWidth / 3;
      this.renderer.view.style.width = `${width}px`;
      this.renderer.view.style.height = `${width * 1.1}px`;
    });
  }
  componentDidMount() {
    // init the size of canvas
    const width = window.innerWidth / 3 > 300 ? 300 : window.innerWidth / 3;
    this.renderer = new PIXI.WebGLRenderer(width, width * 1.1, {transparent:true});
    // renderer.backgroundColor = 0x00FFFFFF;
    ReactDOM.findDOMNode(this).appendChild(this.renderer.view);
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

    live2dSprite.adjustScale(config.scaleX, config.scaleY, config.scaleZ);
    live2dSprite.adjustTranslate(config.translateX, config.translateY);
    live2dSprite.startRandomMotion('idle');

    live2dSprite.on('click', (evt) => {
      const point = evt.data.global;
      if (live2dSprite.hitTest('body', point.x, point.y)) {
        live2dSprite.startRandomMotionOnce('tap_body');
      }
    });
    live2dSprite.on('mousemove', (evt) => {
      const point = evt.data.global;
      live2dSprite.setViewPoint(point.x, point.y);
    });

    const animate =  () => {
      requestAnimationFrame(animate);
      this.renderer.render(stage);
    }
    animate();
  }

  /**
   * get live2D model by day
   */
  getModel = () => {
    const models = [ modelMorakumo, modelHaru, modelShizuku, modelMiku, modelHaruto ];
    const date = new Date();
    return models[date.getDay() % 5];
  }

  render() {
    return <div id="live2d" style={{ pointerEvents: 'none' }}/>
  }
}

export default Live2D;