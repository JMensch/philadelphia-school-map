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
        // and return this
        if (this.currVisibleSchools) {
            this.map.removeLayer(this.currVisibleSchools);
            return this;
        }

        // display school information on marker hover
        let bindHover = function(feature, marker) {
            marker.on('mouseover', function(e) {
                $('#info-name').html(feature.properties.FACIL_NAME);
                $('#info-address').html(feature.properties.FACIL_ADDRESS);
                $('#info-phone').html(feature.properties.FACIL_TELEPHONE);
                $('#info-grades').html(feature.properties.GRADE_LEVEL);
                $('#info-type').html(feature.properties.TYPE_SPECIFIC);
            });
        };

        // determine which schools are in the catchment boundaries
        let schoolsinbounds = [];
        Leaflet.geoJson(_schools).eachLayer(function(marker) {
            if (boundaries.contains(marker.getLatLng())) {
                schoolsinbounds.push(marker);
            }
        });

        // create a layer group
        let newSchoolLayer = Leaflet.layerGroup(schoolsinbounds);

        // add layer group to map
        newSchoolLayer.addTo(this.map);
        // let layer = Leaflet.geoJson(schoolsinbounds, {
        //     onEachFeature: bindHover
        // }).addTo(this.map);

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
        let consoleFeature = function(feature, layer) {
            // adds schools in catchment to map
            layer.on('mouseover', function(e) {
                // console.log(e.target.feature.properties);
                let boundaries = layer.getBounds();
                this.toggleSchools(schools, boundaries);
            }.bind(this));

            // removes schools from map
            layer.on('mouseout', function(e) {
                this.toggleSchools(schools);
            }.bind(this));

        }.bind(this);

        // add catchment layer to the map
        let layer = Leaflet.geoJson(catchments, {
            onEachFeature: consoleFeature
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
