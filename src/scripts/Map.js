'use strict';
var $ = require('jQuery');

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

        // if geojson exists, add it
        if (geojson !== undefined) {
            if (typeof geojson == 'string') {
                geojson = JSON.parse(geojson);
            }
            map.data.addGeoJson(geojson);
        }

        // load the catchment data
        let geoXml = new geoXML3.parser({
             map: map,
             zoom: true,
             singleInfoWindow: true,
            //  markerOptions: {optimized: false},
            //  createMarker: function() {},
             //the function called after parsing the kml file
             afterParse: addEvents
        });

        function addEvents(geoXml) {
            for (let i=0; i < geoXml[0].placemarks.length; i++) {
                let placemark = geoXml[0].placemarks[i];
                placemark.name = 'TEST ' + i;
                polygonMouseover(placemark.polygon,placemark.name);
                $('#map_text').append(placemark.name + ', ');
            }
        }

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
        
        geoXml.parse('https://raw.githubusercontent.com/JMensch/philadelphia-school-search/master/dist/data/catchments.kml');

        google.maps.event.addDomListener(map, 'mouseover', function() {
            console.log('hover!')
      });
        return map;
    }
}

exports.Map = Map;
