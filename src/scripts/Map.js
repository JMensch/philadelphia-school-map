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
        let layer = Leaflet.geoJson(geojson)
            .addTo(this.map);
        // this.map.data.addGeoJson(geojson);
        // this.map.data.addListener('mouseover', function(event) {
        //     $('#info-name').html(event.feature.getProperty('FACIL_NAME'));
        //     $('#info-address').html(event.feature.getProperty('FACIL_ADDRESS'));
        //     $('#info-phone').html(event.feature.getProperty('FACIL_TELEPHONE'));
        //     $('#info-grades').html(event.feature.getProperty('GRADE_LEVEL'));
        //     $('#info-type').html(event.feature.getProperty('TYPE_SPECIFIC'));
        // });
        return this;
    }
    /**
     * Adds kml layer to the map
     * @param {string} kmlLoc The location of the KML layer file
     * @return {object}       The map object
     */
    addKmlLayer(kmlLoc) {
        let app = app || {};

        omnivore.kml(kmlLoc).addTo(this.map);
        return this;
    }
    /**
     * Adds the bare map to the map
     * @param {string} loc The HTML #id to add the map to
     * @return {object}    The map object
     */
    render(loc) {
        // default the map to Philly
        this.map = Leaflet.map(loc).setView([39.99, -75.107], 12)

        // load the tiles
        Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            id: 'menschy28.cifpumc636h7ks6kqjj2kk1uy',
            accessToken: 'pk.eyJ1IjoibWVuc2NoeTI4IiwiYSI6ImNpZnB1bWRiMGFkZjZpdWx4eXZyYnRwejYifQ.wn5cyDtjQct-_iUl3lI3vQ'
        }).addTo(this.map);

        return this;
    }
}
