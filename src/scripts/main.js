'use strict';
import * from './API';
import geoXML3 from './geoxml3';
import InfoBubble from './infobubble';
import { Map } from './Map';
// import { Metadata } from './Metadata'
// import init from './init';

let initPage = function() {
    window.API = new Api.Api();
    // init.test(Metadata.Metadata);
    init.init(Map.Map);
}

window.onload = initPage;
