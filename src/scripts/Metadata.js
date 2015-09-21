'use strict';
var parser = require('csv-parse'),
    fs     = require('fs');


class Metadata {
    constructor(args) {
        args = args || {};
    }

    read(src) {
        let parsed = parser({ delimiter: ',' }, function(err, data) {
            console.log(data);
        });

        console.log(fs)
        console.log(parser)
        let test = fs.createReadStream('../../dist/data/meta.csv').pipe(parsed);
    }
}

exports.Metadata = Metadata;
