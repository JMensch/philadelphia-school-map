'use strict';
import Api from './API';
// const InfoBubble = require('./infobubble');
import Map from './Map';
import Metadata from './Metadata';
import { init } from './init';

const app = {
    'Api': new Api(),
    'Map': new Map()
    // 'Metadata': new Metadata(),
};

/**
 * Runs the app
 */
window.run = function() {
    init();
};

window.app = app;
