define(['config', 'angular'], function (config, angular) {
    "use strict";

    var debug = config.debug;
    debug.log("[controllers.js] loaded namespace.");

    return angular.module('controllers', ['services']);

});