'use strict';

class Map {
    constructor(args) {
        args = args || {};
        this.geojson = args.geojson;
        // this.render();
    }

    /**
    * Returns a new instance of map
    * @param string loc  the #id location in the markup
    * @return map object
    */
    render(loc) {
        window.API.get("../../data/data.geojson")
            .then(
                function (ret) {
                    return this.map(loc, ret);
                }.bind(this),
                function (error) {
                    console.log(error);
                }
            );
    }

    /**
    * Builds the map instance
    * @param string loc      the #id location in the markup
    * @param json   geojson  the geojson object of schools
    * @return map object
    */
    map(loc, geojson) {
        let map = {};
        // load a map of philly
        map = new google.maps.Map(document.getElementById(loc), {
          center: { lat: 39.9500, lng: -75.1667 },
          zoom: 12
        });
        var kmlLayer = new google.maps.KmlLayer({
            url: 'https://raw.githubusercontent.com/JMensch/philadelphia-school-search/data/dist/data/catchments.kml',
            map: map
        });
        // if geojson exists, add it
        if (geojson !== undefined) {
            if (typeof geojson == 'string') {
                geojson = JSON.parse(geojson);
            }
            map.data.addGeoJson(geojson);
        }

        console.log(kmlLayer)
        return map;
    }
}

exports.Map = Map;
