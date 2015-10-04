'use strict';
import Api from './API';
// const InfoBubble = require('./infobubble');
import Map from './Map';
import Metadata from './Metadata';
import { init } from './init';
// const geoXML3 = require('./geoxml3');
const geoXML3 = null;

const app = {
    'Api': new Api(),
    'Map': new Map(),
    // 'Metadata': new Metadata(),
    'geoXML3': geoXML3
};

/**
 * Runs the app
 */
let run = function() {
    init();
};


window.app = app;
window.onload = run;
