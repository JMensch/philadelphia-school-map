'use strict';
const $ = require('jquery');

export default class Api {
    /**
     * GET call
     * @param  {string} url The request url
     * @return {object}     Promise containing the response
     */
    get(url) {
        return new Promise(
            function(resolve, reject) {
                $.get(url, function(ret) {
                    resolve(ret);
                })
                .fail(function(err) {
                    reject(err);
                });
            }
        );
    }
}
