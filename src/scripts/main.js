'use strict';
var Api = require('./API.js'),
    geoXML3 = require('./geoxml3.js'),
    InfoBubble = require('./infobubble.js'),
    Map = require('./Map.js'),
    Metadata = require('./Metadata.js'),
    init = require('./init.js');


let initPage = function() {
    window.API = new Api.Api();
    // init.test(Metadata.Metadata);
    init.init(Map.Map);
}

window.onload = initPage;
