'use strict';
const $ = require('jQuery');
const Leaflet = require('Leaflet');
const LeafletPip = require('leaflet-pip');

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
        this.currVisibleSchools = null;
        return true;
    }
    /**
     * Initializes catchment layer
     * @param  {JSON} schools    The geojson of schools
     * @param  {JSON} catchments The geojson of catchments
     * @return {object}          The map object
     */
    load(schools, catchments) {
        this.addCatchmentLayer(catchments);
        this.addSchoolsLayer(schools);
        return this;
    }
    /**
     * Adds geojson object to the map object
     * @param {JSON} geojson The geojson object to add
     * @return {object}      The map object
     */
    addSchoolsLayer(schools) {
        let _schools = schools;

        // determine which schools are in the catchment boundaries
        let schoolMarkers = [];
        Leaflet.geoJson(_schools).eachLayer(function(marker) {
            let markerProps = marker.feature.properties;
            var cmkrOps = {
                radius: 3,
                fillColor: "#F7646C",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };
            let cmkr = new Leaflet.CircleMarker(marker.getLatLng(), cmkrOps);

            cmkr.on('mouseover', function(e) {
                $('#info-name').html(markerProps.FACIL_NAME);
                $('#info-address').html(markerProps.FACIL_ADDRESS);
                $('#info-phone').html(markerProps.FACIL_TELEPHONE);
                $('#info-grades').html(markerProps.GRADE_LEVEL);
                $('#info-type').html(markerProps.TYPE_SPECIFIC);
            });
            schoolMarkers.push(cmkr);
        });

        // create a layer group
        let schoolLayer = Leaflet.layerGroup(schoolMarkers).addTo(this.map);

        return this;
    }
    /**
     * Adds catchment layer to the map
     * @param {JSON} catchments  the geojson object to add
     * @return {object}       The map object
     */
    addCatchmentLayer(catchments) {
        Leaflet.geoJson(catchments).addTo(this.map);
        return this;
    }
    /**
     * Adds the bare map to the screen
     * @param {string} loc The HTML #id to add the map to
     * @return {object}    The map object
     */
    render(loc) {
        // default the map to Philly
        this.map = Leaflet.map(loc).setView([39.99, -75.107], 12);

        // load the tiles
        Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            id: 'menschy28.cifpumc636h7ks6kqjj2kk1uy',
            accessToken: 'pk.eyJ1IjoibWVuc2NoeTI4IiwiYSI6ImNpZnB1bWRiMGFkZjZpdWx4eXZyYnRwejYifQ.wn5cyDtjQct-_iUl3lI3vQ'
        }).addTo(this.map);

        return this;
    }
}
