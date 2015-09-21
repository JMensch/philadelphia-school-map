'use strict';
var Map = require('./Map.js'),
    Metadata = require('./Metadata.js'),
    init = require('./init.js');

window.initPage = function() {
    init.test(Metadata.Metadata);
    init.init(Map.Map);
}
