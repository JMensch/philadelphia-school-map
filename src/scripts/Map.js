'use strict';
var $ = require('jQuery');

class Map {
    constructor(args) {
        args = args || {};
        this.geojsonLoc = "https://raw.githubusercontent.com/JMensch/philadelphia-school-search/master/dist/data/data.geojson";
        this.kmlLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-search/master/dist/data/catchments.kml';
    }
    /**
    * Returns a new instance of map
    * @param string loc  the #id of where we want the map
    * @return map object
    */
    render(loc) {
        let map = this.addMap(loc);
        this.addGeojson(map, this.geojsonLoc);
        this.addKmlLayer(map, this.kmlLoc);
    }
    /**
    * Adds geojson to map object
    * @param object map  the map object
    * @param string src  the location of the geojson file
    * @return bool
    */
    addGeojson(map, src) {
        window.API.get(src)
            .then(
                function (geojson) {
                    // if geojson exists, add it
                    if (geojson !== undefined) {
                        if (typeof geojson == 'string') {
                            geojson = JSON.parse(geojson);
                        }
                        map.data.addGeoJson(geojson);
                    }
                    return true;
                },
                function (error) {
                    console.log(error);
                    return false;
                }
            );
    }
    /**
    * Adds kml layer to map object
    * @param object map  the map object
    * @param string src  the location of the kml file
    * @return bool
    */
    addKmlLayer(map, src) {
        // geoXML callback
        function addEvents() {
            this.addCatchmentEvent(map, geoXml);
        };

        // load the catchment data
        let geoXml = new geoXML3.parser({
             map: map,
             zoom: true,
             singleInfoWindow: true,
             //markerOptions: {optimized: false},
             //createMarker: function() {},
             //the function called after parsing the kml file
             afterParse: addEvents.bind(this)
        });

        geoXml.parse(src);

        return true;
    }
    /**
    * Add hover events to catchment layer
    * @param object geoXml  the catchment layer
    * @return bool
    */
    addCatchmentEvent(map, geoXml) {
        // the popups
        var ib = new InfoBubble({
          shadowStyle: 0,
          padding: 0,
          backgroundColor: 'white',
          borderRadius: 4,
          arrowSize: 0,
          borderWidth: 1,
          borderColor: 'black',
          disableAutoPan: true,
          hideCloseButton: true,
          arrowPosition: 50,
          arrowStyle: 0
        });

        // attached the event listener
        function polygonMouseover(poly, text) {
            google.maps.event.addListener(poly, 'mouseover', function(evt) {
                ib.setContent(text);
                ib.setPosition(evt.latLng);
                ib.setMap(map);
                ib.open()
            });
            google.maps.event.addListener(poly, 'mouseout', function(evt) {
                ib.close()
            });
        }

        if (geoXml['docs'] && geoXml['docs'].length > 0) {
            // iterates through the catchment zones and attaches event layers
            for (let i=0; i < geoXml['docs'][0].placemarks.length; i++) {
                let placemark = geoXml['docs'][0].placemarks[i];
                placemark.name = 'TEST ' + i;
                polygonMouseover(placemark.polygon,placemark.name);
                $('#map_text').append(placemark.name + ', ');
            }
        }

        return true;
    }
    /**
    * Initiates the map instance
    * @param string loc      the #id location in the markup
    * @return map object
    */
    addMap(loc) {
        let map = {};
        // default the map to Philly
        map = new google.maps.Map(document.getElementById(loc), {
          center: { lat: 39.9500, lng: -75.1667 },
          zoom: 11
        });

        return map;
    }
}

exports.Map = Map;
