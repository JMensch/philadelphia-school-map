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
        window.API.get("https://raw.githubusercontent.com/JMensch/philadelphia-school-search/master/dist/data/data.geojson")
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
        // default the map to Philly
        map = new google.maps.Map(document.getElementById(loc), {
          center: { lat: 39.9500, lng: -75.1667 },
          zoom: 11
        });

        // add the catchment layer
        var kmlLayer = new google.maps.KmlLayer({
            url: 'https://raw.githubusercontent.com/JMensch/philadelphia-school-search/master/dist/data/catchments.kml',
            map: map,
            preserveViewport: true
        });

        // if geojson exists, add it
        if (geojson !== undefined) {
            if (typeof geojson == 'string') {
                geojson = JSON.parse(geojson);
            }
            map.data.addGeoJson(geojson);
        }

        return map;
    }
}

exports.Map = Map;
