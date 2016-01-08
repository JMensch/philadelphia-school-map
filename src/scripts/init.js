'use strict';
/**
 * Starts the app
 * @return {bool}
 */
function init() {
    let app = window.app || {};
    let schools;
    let catchments;
    // the location of our school points
    let schoolsLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-map/master/data/data.geojson';
    // the location of our catchment file
    let catchmentsLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-search/master/data/catchments.geojson';

    // init the map
    app.Map.render('map');

    var schools;
    // add the goejson
    _getData(schoolsLoc).then(
        function (res) {
            // try to add the schools layer
            try {
                if (res) {
                    schools = JSON.parse(res);
                    app.Map.addSchools(schools);
                }
            } catch (error) {
                console.log(error);
            }
        },
        function (error) {
            console.log(error);
        }
    );
    //undefined
    console.log(schools);

    // add the kml layer
    _getData(catchmentsLoc).then(
        function (catchments) {
            // try to add the catchments layer
            try {
                if (catchments) {
                    catchments = JSON.parse(catchments);
                    app.Map.addCatchmentLayer(catchments, schools);
                }
            } catch (error) {
                console.log(error);
            }
        },
        function (error) {
            console.log(error);
        }
    );

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
