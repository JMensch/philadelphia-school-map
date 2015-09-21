'use strict';
var $ = require('jquery');

class Map {
    constructor(args) {
        args = args || {};
        this.geojson = args.geojson;
        this.loadJSON();
    }

    loadJSON(callback) {
        callback = callback || function(json) {};
        $.getJSON("../../data/data.geojson", function(json) {
            callback(json);
        });
    }

    /**
    * Returns a new instance of map
    * @param string loc  the #id location in the markup
    * @return map object
    */
    render(loc) {
        let json = {};
        let callback = function(json) {
            this.map(loc, json);
        }.bind(this);

        return this.loadJSON(callback);
    }

    /**
    * Builds the map instance
    * @param string loc  the #id location in the markup
    * @return map object
    */
    map(loc, json) {
        let map = {};

        // load a map of philly
        map = new google.maps.Map(document.getElementById(loc), {
          center: { lat: 39.9500, lng: -75.1667 },
          zoom: 12
        });

        // if geojson exists, add it
        if (this.geojson !== undefined) {
            map.data.loadGeoJson(this.geojson);
        }

        return map;
    }
}

exports.Map = Map;
