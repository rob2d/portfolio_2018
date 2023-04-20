/* eslint-disable no-underscore-dangle */
import { Object3D, Vector2, DoubleSide, NearestFilter, LinearMipMapLinearFilter } from 'three';

import textAlign from './textAlign';
import CanvasText from './CanvasText';

export default class Text2D extends Object3D {

    side = undefined;

    antialias = undefined;

    texture = undefined;

    material = undefined;

    _align = undefined;

    _font = undefined;

    _fillStyle = undefined;

    _text = undefined;

    _shadowColor = undefined;

    _shadowBlur = undefined;

    _shadowOffsetX = undefined;

    _shadowOffsetY = undefined;

    _lineHeight = undefined;

    _backgroundColor = undefined;

    _horizontalPadding = undefined;

    _verticalPadding = undefined;

    canvas = undefined;

    constructor(text = '', options = {}) {

        super();

        this._align = new Vector2();
        this._font = options.font || '30px Arial';
        this._fillStyle = options.fillStyle || '#FFFFFF';

        this._shadowColor = options.shadowColor || 'rgba(0, 0, 0, 0)';
        this._shadowBlur = options.shadowBlur || 0;
        this._shadowOffsetX = options.shadowOffsetX || 0;
        this._shadowOffsetY = options.shadowOffsetY || 0;
        this._lineHeight = options.lineHeight || 1.2;

        this._backgroundColor = options.backgroundColor || 'transparent';
        this._horizontalPadding = options.horizontalPadding || 0;
        this._verticalPadding = options.verticalPadding || 0;

        this.canvas = new CanvasText();

        this.align = options.align || textAlign.center;
        this.side = options.side || DoubleSide;

        // this.anchor = Label.fontAlignAnchor[ this._textAlign ]
        this.antialias = (typeof options.antialias === "undefined") ? true : options.antialias;
        this.text = text;
    }

    get width() { return this.canvas.textWidth }

    get height() { return this.canvas.textHeight }

    get text() { return this._text }

    set text(value) {
        if(this._text !== value) {
            this._text = value;
            this.updateText();
        }
    }

    get font() { return this._font }

    set font(value) {
        if(this._font !== value) {
            this._font = value;
            this.updateText();
        }
    }

    get fillStyle() {
        return this._fillStyle;
    }

    set fillStyle(value) {
        if(this._fillStyle !== value) {
            this._fillStyle = value;
            this.updateText();
        }
    }

    get align() {
        return this._align;
    }

    set align(value) {
        this._align.copy(value);
    }

    cleanUp() {
        if(this.texture) {
            this.texture.dispose();
        }
    }

    applyAntiAlias() {
        if(this.antialias === false) {
            this.texture.magFilter = NearestFilter;
            this.texture.minFilter = LinearMipMapLinearFilter;
        }
    }
}
