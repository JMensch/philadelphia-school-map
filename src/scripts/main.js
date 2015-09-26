'use strict';
var Api = require('./API.js'),
    Map = require('./Map.js'),
    Metadata = require('./Metadata.js'),
    init = require('./init.js');


let initPage = function() {
    window.API = new Api.Api();
    // init.test(Metadata.Metadata);
    init.init(Map.Map);
}

window.onload = initPage;
