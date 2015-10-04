'use strict';
/**
 * Starts the app
 * @return {bool}
 */
function init() {
    let app = window.app || {};
    let geojson;
    // the location of our geojson file of schools
    let geojsonLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-map/master/dist/data/data.geojson';
    // the location of our kml layer file
    let kmlLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-search/master/dist/data/catchments.kml';

    geojson = _getData(geojsonLoc);

    // init the map
    app.Map.render('map');

    // try to add the geojson layer
    try {
        if (geojson) {
            app.Map.addGeojson(geojson);
        }
    } catch (e) {
        console.log(e);
    }

    //try to add the kml layer
    try {
        app.Map.addKmlLayer(kmlLoc);
    } catch (e) {
        console.log(e);
    }

    return true;
}

function test(Metadata) {
    let args = {};
    let meta = new Metadata(args);
    meta.read();
}

/**
 * Gets geojson data
 * @param  {string} src The location to request data from
 * @return {object}     Response or empty object
 */
function _getData(src) {
    let app = window.app || {};
    app.Api.get(src)
        .then(
            function (res) {
                return res;
            },
            function (error) {
                console.log(error);
                return {};
            }
        );
}

export { init, test };
