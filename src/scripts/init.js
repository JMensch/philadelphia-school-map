'use strict';
function init() {
    let app = app || {};
    app.Map.render('map');
}

function test(Metadata) {
    let args = {};
    let meta = new Metadata(args);
    meta.read();
}

function _getData() {
    kmlLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-search/master/dist/data/catchments.kml';
    geojsonLoc = 'https://raw.githubusercontent.com/JMensch/philadelphia-school-map/master/dist/data/data.geojson';
}
export { init, test };


// this.kmlLoc =


app.Api.get(src)
    .then(
        function (geojson) {
            // if geojson exists, add it
            if (geojson !== undefined) {
                if (typeof geojson == 'string') {
                    geojson = JSON.parse(geojson);
                }

            }
            return true;
        },
        function (error) {
            console.log(error);
            return false;
        }
    );
