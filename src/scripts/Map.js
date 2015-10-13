'use strict';
const $ = require('jQuery');
const Leaflet = require('Leaflet');
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
        this.map.data.addListener('mouseover', function(event) {
            $('#info-name').html(event.feature.getProperty('FACIL_NAME'));
            $('#info-address').html(event.feature.getProperty('FACIL_ADDRESS'));
            $('#info-phone').html(event.feature.getProperty('FACIL_TELEPHONE'));
            $('#info-grades').html(event.feature.getProperty('GRADE_LEVEL'));
            $('#info-type').html(event.feature.getProperty('TYPE_SPECIFIC'));
        });
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
        let geoXml = geoXML3.parser({
             map: map,
             suppressInfoWindows: true,
             zoom: false,
            //  singleInfoWindow: true,
            //  preserveViewport: true,
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
        // default the map to Philly
        this.map = Leaflet.map(loc).setView([39.99, -75.107], 12);
        Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'your.mapbox.project.id',
            accessToken: 'your.mapbox.public.access.token'
        }).addTo(map);
        return this;
    }
}
