'use strict';
import Api from './API';
import Map from './Map';
import { init } from './init';

const app = {
    'Api': new Api(),
    'Map': new Map()
};

/**
 * Runs the app
 */
window.onload = function() {
    init();
};

window.app = app;
