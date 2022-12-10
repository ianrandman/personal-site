/* eslint-disable */
/**
 * @module ol/interaction/DblClickDragZoom
 */

/**
 * @typedef {Object} Options
 * @property {number} [duration=400] Animation duration in milliseconds. *
 * @property {number} [delta=1] The zoom delta applied on move of one pixel. *
 * @property {function(boolean):boolean} [stopDown]
 * Should the down event be propagated to other interactions, or should be
 * stopped?
 */

import MapBrowserEventType from 'ol/MapBrowserEventType';
import { Interaction } from 'ol/interaction';
import { getValues } from 'ol/obj';

/**
 * @classdesc
 * Allows the user to zoom the map by double tap/clik then drag up/down
 * with one finger/left mouse.
 * @api
 */
class DblClickDragZoom extends Interaction {
  /**
   * @param {Options} [opt_options] Options.
   */
  constructor(opt_options) {
    const options = opt_options ? opt_options : {};

    super(
      /** @type {import("./Interaction.js").InteractionOptions} */ (options)
    );

    if (options.stopDown) {
      this.stopDown = options.stopDown;
    }

    /**
     * @private
     * @type {number}
     */
    this.scaleDeltaByPixel_ = options.delta ? options.delta : 0.003;

    /**
     * @private
     * @type {number}
     */
    this.duration_ = options.duration !== undefined ? options.duration : 250;

    /**
     * @type {boolean}
     * @private
     */
    this.handlingDownUpSequence_ = false;

    /**
     * @type {boolean}
     * @private
     */
    this.handlingDoubleDownSequence_ = false;

    /**
     * @type {!Object<string, PointerEvent>}
     * @private
     */
    this.trackedPointers_ = {};

    /**
     * @type {Array<PointerEvent>}
     * @protected
     */
    this.targetPointers = [];

    this.newEvent = false;
    this.animating = false;
  }

  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent  map browser event} and may call into
   * other functions, if event sequences like e.g. 'drag' or 'down-up' etc. are
   * detected.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   */
  handleEvent(mapBrowserEvent) {
    if (!mapBrowserEvent.originalEvent) {
      return true;
    }

    let stopEvent = false;
    this.updateTrackedPointers_(mapBrowserEvent);
    if (this.handlingDownUpSequence_) {
      if (mapBrowserEvent.type == MapBrowserEventType.POINTERDRAG) {
        console.log('dragging')
        this.newEvent = true;
        // console.log('icPOINTERDRAGi');
        this.handleDragEvent(mapBrowserEvent);
        // prevent page scrolling during dragging
        mapBrowserEvent.originalEvent.preventDefault();
      } else if (mapBrowserEvent.type == MapBrowserEventType.POINTERUP) {
        console.log('up')
        const handledUp = this.handleUpEvent(mapBrowserEvent);
        this.handlingDownUpSequence_ = false;
      }
    } else {
      if (mapBrowserEvent.type == MapBrowserEventType.POINTERDOWN) {
        console.log('downing')
        this.newEvent = true;
        if (this.handlingDoubleDownSequence_) {
          this.handlingDoubleDownSequence_ = false;
          const handled = this.handleDownEvent(mapBrowserEvent);
          this.handlingDownUpSequence_ = handled;
          stopEvent = this.stopDown(handled);
        } else {
          stopEvent = this.stopDown(false);
          this.waitForDblTap();
        }
      } else if (mapBrowserEvent.type == MapBrowserEventType.POINTERDRAG) {
        console.log('pointermove')
        console.log(this.handlingDoubleDownSequence_)
        this.endInteraction();
        // this.handleMoveEvent(mapBrowserEvent);
      }
    }
    return !stopEvent;
  }

  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */
  handleDragEvent(mapBrowserEvent) {
    console.log('handling drag')
    if (this.animating) {
      return
    }

    let scaleDelta = 1.0;

    const touch0 = this.targetPointers[0];
    const touch1 = this.down_.originalEvent;
    const distance = touch1.clientY - touch0.clientY;

    if (this.lastDistance_ !== undefined) {
      scaleDelta =
        1 - (this.lastDistance_ - distance) * this.scaleDeltaByPixel_;
    }
    this.lastDistance_ = distance;

    if (scaleDelta != 1.0) {
      this.lastScaleDelta_ = scaleDelta;
    }

    // scale, bypass the resolution constraint
    const map = mapBrowserEvent.map;
    const view = map.getView();
    map.render();
    view.adjustResolutionInternal(scaleDelta);
  }

  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleDownEvent(mapBrowserEvent) {
    // console.log('down')

    console.log(this.targetPointers)
    if (this.targetPointers.length == 1) {
      const map = mapBrowserEvent.map;
      this.anchor_ = null;
      this.lastDistance_ = undefined;
      this.lastScaleDelta_ = 1;
      this.down_ = mapBrowserEvent;
      if (!this.handlingDownUpSequence_) {
        map.getView().beginInteraction();
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Handle pointer up events zooming out.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  async handleUpEvent(mapBrowserEvent) {
    if (this.targetPointers.length == 0) {
      const map = mapBrowserEvent.map;
      const view = map.getView();
      this.newEvent = false;
      // let center = view.getCenter();

      this.animating = true;
      let lastZoom = -1;
      while (Math.abs(this.lastScaleDelta_ - 1) > 0.001) {
        // console.log('animating')
        // scale, bypass the resolution constraint
        if (this.newEvent || lastZoom === view.getZoom()) {
          map.render();
          this.newEvent = false;
          this.animating = false;
          break;
        }
        lastZoom = view.getZoom();

        map.render();
        // console.log(this.lastScaleDelta_)
        // console.log(view.getZoom())
        view.adjustResolutionInternal(this.lastScaleDelta_);
        await new Promise(r => setTimeout(r, 1));
        this.lastScaleDelta_ = (0.95 * (this.lastScaleDelta_ - 1)) + 1;
      }
      this.animating = false;

      const direction = this.lastScaleDelta_ > 1 ? 1 : -1;
      view.endInteraction(this.duration_, direction);
      this.handlingDownUpSequence_ = false;
      this.handlingDoubleDownSequence_ = false;
      return false;
    } else {
      return true;
    }
  }

  /**
   * This function is used to determine if "down" events should be propagated
   * to other interactions or should be stopped.
   * @param {boolean} handled Was the event handled by the interaction?
   * @return {boolean} Should the `down` event be stopped?
   */
  stopDown(handled) {
    return handled;
  }

  /**
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @private
   */
  updateTrackedPointers_(mapBrowserEvent) {
    if (isPointerDraggingEvent(mapBrowserEvent)) {
      const event = mapBrowserEvent.originalEvent;

      const id = event.pointerId.toString();
      if (mapBrowserEvent.type == MapBrowserEventType.POINTERUP) {
        delete this.trackedPointers_[id];
      } else if (mapBrowserEvent.type == MapBrowserEventType.POINTERDOWN) {
        this.trackedPointers_[id] = event;
      } else if (id in this.trackedPointers_) {
        // update only when there was a pointerdown event for this pointer
        this.trackedPointers_[id] = event;
      }
      this.targetPointers = getValues(this.trackedPointers_);
    }
  }

  /**
   * Wait the second double finger tap.
   */
  waitForDblTap() {
    if (this.doubleTapTimeoutId_ !== undefined) {
      console.log('double')
      // double-click
      clearTimeout(this.doubleTapTimeoutId_);
      this.doubleTapTimeoutId_ = undefined;
    } else {
      console.log('else')
      this.handlingDoubleDownSequence_ = true;
      this.doubleTapTimeoutId_ = setTimeout(
        this.endInteraction.bind(this),
        400
      );
    }
  }

  /**
   * @private
   */
  endInteraction() {
    this.handlingDoubleDownSequence_ = false;
    this.doubleTapTimeoutId_ = undefined;
  }
}

/**
 * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
 * @return {boolean} Whether the event is a pointerdown, pointerdrag
 *     or pointerup event.
 */
function isPointerDraggingEvent(mapBrowserEvent) {
  const type = mapBrowserEvent.type;
  return (
    type === MapBrowserEventType.POINTERDOWN ||
    type === MapBrowserEventType.POINTERDRAG ||
    type === MapBrowserEventType.POINTERUP
  );
}

export default DblClickDragZoom;
