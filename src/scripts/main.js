var $ = require('jquery');

class Map {
    constructor(args) {
        args = args || {};
        this.geojson = args.geojson;
    }

    loadJSON() {
        $.getJSON("../../data/data.geojson", function(json) {
            console.log(json)
        });
    }

    /**
    * Returns a new instance of map
    * @param string loc  the #id location in the markup
    * @return map object
    */
    render(loc) {
        this.loadJSON();
        return this.map(loc);
    }

    /**
    * Builds the map instance
    * @param string loc  the #id location in the markup
    * @return map object
    */
    map(loc) {
        // map of philly
        let map = new google.maps.Map(document.getElementById(loc), {
          center: { lat: 39.9500, lng: 75.1667 },
          zoom: 4
        });

        // if geojson exists, add it
        if (this.geojson !== undefined) {
            map.data.loadGeoJson(this.geojson);
        }

        return map;
    }
}
