'use strict';
const $ = require('jQuery');

/**
* The map instance and related methods
* @access public
*/
export default class Map {
    /**
     * Instantiates the Map instance
     * @return {bool}
     */
    constructor() {
        this.map = {};
        return true;
    }
    /**
     * Adds geojson object to the map object
     * @param {JSON} geojson The geojson object to add
     * @return {object}      The map object
     */
    addGeojson(geojson) {
        this.map.data.addGeoJson(geojson);
        return this;
    }
    /**
     * Adds kml layer to the map
     * @param {string} kmlLoc The location of the KML layer file
     * @return {object}       The map object
     */
    addKmlLayer(kmlLoc) {
        let map = this.map;
        let app = app || {};

        // geoXML callback
        function addEvents() {
            // this.addCatchmentEvent(map, geoXml);
        }

        // load the catchment data
        let geoXml = app.geoXML3.parser({
             map: map,
             zoom: true,
             singleInfoWindow: true,
             //markerOptions: {optimized: false},
             //createMarker: function() {},
             //the function called after parsing the kml file
             afterParse: addEvents.bind(this)
        });

        geoXml.parse(kmlLoc);

        return this;
    }
    /**
    * Add hover events to catchment layer
    * @param object geoXml  The catchment layer
    * @return {object}      The map object
    */
    addCatchmentEvent(map, geoXml) {
        let google = google || {};
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
                ib.open();
            });

            google.maps.event.addListener(poly, 'mouseout', function(evt) {
                ib.close();
            });
        }

        if (geoXml.docs && geoXml.docs.length > 0) {
            // iterates through the catchment zones and attaches event layers
            for (let i=0; i < geoXml.docs[0].placemarks.length; i++) {
                let placemark = geoXml.docs[0].placemarks[i];
                placemark.name = 'TEST ' + i;
                polygonMouseover(placemark.polygon,placemark.name);
                $('#map_text').append(placemark.name + ', ');
            }
        }

        return true;
    }
    /**
     * Adds the bare map to the map
     * @param {string} loc The HTML #id to add the map to
     * @return {object}    The map object
     */
    render(loc) {
        console.log(google)
        let google = google || {};
        // default the map to Philly
        this.map = new google.maps.Map(document.getElementById(loc), {
          center: { lat: 39.9500, lng: -75.1667 },
          zoom: 11
        });

        return this;
    }
}
