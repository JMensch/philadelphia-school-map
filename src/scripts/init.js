'use strict';
/**
 * Starts the app
 * @return {bool}
 */
function init() {
    let app = window.app || {};
    let geojson;
    // the location of our geojson file of schools
    let geojsonLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-map/master/data/data.geojson';
    // the location of our kml layer file
    let kmlLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-search/master/data/catchments.geojson';

    // init the map
    app.Map.render('map');

    // add the goejson
    _getData(geojsonLoc).then(
        function (geojson) {
            // try to add the geojson layer
            try {
                if (geojson) {
                    geojson = JSON.parse(geojson);
                    app.Map.addGeojson(geojson);
                }
            } catch (error) {
                console.log(error);
            }
        },
        function (error) {
            console.log(error);
        }
    );

    // add the kml layer
    _getData(kmlLoc).then(
        function (kml) {
            // try to add the kml layer
            try {
                if (kml) {
                    app.Map.addKmlLayer(kml);
                }
            } catch (error) {
                console.log(error)
            }
        },
        function (error) {
            console.log(error);
        }
    )

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
 * @return {Promise}    Response or empty object
 */
function _getData(src) {
    let app = window.app || {};
    return new Promise(
        function(resolve, reject) {
            app.Api.get(src)
                .then(
                    function (res) {
                        resolve(res);
                    },
                    function (error) {
                        console.log(error);
                        reject({});
                    }
                );
        }
    );
}

export { init, test };
