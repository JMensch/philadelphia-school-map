'use strict';
var $ = require('jquery');

export default class Api {
    constructor(args) {
        args = args || {};
    }

    get(url) {
        return new Promise(
            function(resolve, reject) {
                $.get(url, function(ret) {
                    resolve(ret);
                })
                .fail(function(err) {
                    reject(error);
                });
            }
        )
    }
}
