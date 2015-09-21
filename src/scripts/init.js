'use strict';
function init(Map) {
    let args = {};
    let map = new Map(args);
    map.render('map')
}

function test(Metadata) {
    let args = {};
    let meta = new Metadata(args);
    meta.read()
}


exports.init = init;
exports.test = test;
