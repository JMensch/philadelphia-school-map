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
        this.addCatchmentLayer(schools, catchments);
        return this;
    }
    /**
     * Adds geojson object to the map object
     * @param {JSON} geojson The geojson object to add
     * @return {object}      The map object
     */
    toggleSchools(schools, boundaries) {
        let _schools = schools;

        // if there are currently visible schools, remove them
        if (this.currVisibleSchools) {
            this.map.removeLayer(this.currVisibleSchools);
            this.currVisibleSchools = null;
        }

        // determine which schools are in the catchment boundaries
        let schoolsinbounds = [];
        Leaflet.geoJson(_schools).eachLayer(function(marker) {
            if (LeafletPip.pointInLayer(marker.getLatLng(), Leaflet.geoJson(boundaries.toGeoJSON())).length > 0) {
                schoolsinbounds.push(marker);
            }
        });

        // create a layer group
        let newSchoolLayer = Leaflet.layerGroup(schoolsinbounds);

        // display school information on marker hover
        // add layer group to map
        newSchoolLayer.eachLayer(function (marker) {
            let markerProps = marker.feature.properties;
            marker.on('mouseover', function(e) {
                $('#info-name').html(markerProps.FACIL_NAME);
                $('#info-address').html(markerProps.FACIL_ADDRESS);
                $('#info-phone').html(markerProps.FACIL_TELEPHONE);
                $('#info-grades').html(markerProps.GRADE_LEVEL);
                $('#info-type').html(markerProps.TYPE_SPECIFIC);
            });
        }).addTo(this.map);

        this.currVisibleSchools = newSchoolLayer;
        return this;
    }
    /**
     * Adds catchment layer to the map
     * @param {JSON} catchments  the geojson object to add
     * @return {object}       The map object
     */
    addCatchmentLayer(schools, catchments) {
        // add mouseover event
        let addSchoolsOnHover = function(feature, layer) {
            // adds schools in catchment to map
            layer.on('mouseover', function(e) {
                this.toggleSchools(schools, layer);
            }.bind(this));
        }.bind(this);

        // add catchment layer to the map
        let layer = Leaflet.geoJson(catchments, {
            onEachFeature: addSchoolsOnHover
        }).addTo(this.map);

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
