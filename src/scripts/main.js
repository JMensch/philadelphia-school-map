'use strict';
var Map = require('./Map.js'),
    init = require('./init.js');

window.initPage = function() {
    init.init(Map.Map);
}
