/* eslint-disable */

import { Control } from 'ol/control';
import '../../main.css';

export class ToggleSatelliteControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    // button.className = 'rotate-north'
    button.innerHTML = String.fromCodePoint(0x1F6F0, 0xFE0F);

    const element = document.createElement('div');
    element.className = 'satellite-toggle ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    this.parentFn = options.parentFn;
    button.addEventListener('click', this.handle.bind(this), false);
  }

  handle() {
    this.parentFn();
  }
}

export class ToggleBikeOverlayControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = '&#x1f6b2';

    const element = document.createElement('div');
    element.className = 'bike-overlay-toggle ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    this.parentFn = options.parentFn;
    button.addEventListener('click', this.handle.bind(this), false);
  }

  handle() {
    this.parentFn();
  }
}

export class ToggleFullscreenControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = '&#x2922';

    const element = document.createElement('div');
    element.className = 'fullscreen-toggle ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    this.parentFn = options.parentFn;
    button.addEventListener('click', this.handle.bind(this), false);
  }

  handle() {
    this.parentFn();
  }
}
