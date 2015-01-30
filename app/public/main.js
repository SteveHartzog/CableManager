/* global require */
'use strict';

// requirejs config
require.config({
    baseUrl: "/",
    optimize: "uglify",
    paths: {
        // libraries & frameworks
        'jQuery'                : './bower_components/jquery/jquery.min',
        'angular'               : './bower_components/angular/angular.min',
//        'angular-ui'            : './libs/angular-ui/build/angular-ui.min',
//        'angular-bootstrap'     : './libs/angular-bootstrap/ui-bootstrap.min',
        // 'angular-animate'       : './libs/angular/angular-animate',
        'angular-route'         : './bower_components/angular-route/angular-route.min',
        'angular-resource'      : './bower_components/angular-resource/angular-resource',
        'angular-sanitize'      : './bower_components/angular-sanitize/angular-sanitize.min',
        'amplify'               : './bower_components/amplify/lib/amplify.min',
        'amplify.store'         : './bower_components/amplify/lib/amplify.store.min',
        'bootstrap'             : './bower_components/bootstrap/dist/js/bootstrap.min',
        'toastr'                : './bower_components/toastr/toastr.min',
        'lodash'                : './bower_components/lodash/dist/lodash.min',
        'moment'                : './bower_components/momentjs/moment',
        'debug'                 : './bower_components/javascript-debug/ba-debug',

        // Based on the sample app in the book by Pawel Kozlowski and Peter Bacon Darwin:
        // "Mastering Web Application Development with AngularJS"
        'security'              : './services/security/index',
        'security.service'      : './services/security/security',
        'security.interceptor'  : './services/security/interceptor',
        'security.authorization': './services/security/authorization',
        'security.retryQueue'   : './services/security/retryQueue',
        'security.login'        : './services/security/login/login',
        'security.login.form'   : './services/security/login/loginForm',
        'security.login.toolbar': './services/security/login/toolbar',
        'httpRequestTracker'    : './services/httpRequestTracker',

        // Custom routeProvider
        'customRouteProvider'   : './routes/customRouteProvider',
        'routeResolver'         : './routes/routeResolver',


        // custom
        'amplify-angular'       : './services/amplify-angular',
        //'routes'                : './routes/routes',
        'routingConfig'         : './routes/routingConfig',
        'directives'            : './directives/directives',
        'ui.bootstrap.dialog'   : './directives/ui.bootstrap.dialog',
        'dataContext'           : './services/dataContext',
        'dataService'           : './services/dataService',
        'dataService.Subscribers': './services/dataService.Subscribers',
        'dataService.Groups'    : './services/dataService.Groups',
        'dataService.Package'   : './services/dataService.Package',
        'dataService.Channel'   : './services/dataService.Channel',
        'dataService.Lineups'   : './services/dataService.Lineups',
        'services.utils'        : './services/services.utils',
        'mocks'                 : './data/mockData'
    },
    shim: {
        'amplify': {
            deps: ['jQuery'],
            exports: 'amplify'
        },
        'amplify.store': {
            deps: ['amplify'],
            exports: 'amplify.store'
        },
        'angular': {
            exports: 'angular'
        },
        'angular-resource': {
            deps: ['angular'],
            exports: 'angular-resource'
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },
        'bootstrap': {
            deps: ['jQuery'],
            exports: 'bootstrap'
        },
        'jQuery': { exports: 'jQuery' },
        'lodash': { exports: 'lodash' },
        'moment': {
            exports: 'moment'
        },
        'toastr': {
            deps: ['jQuery'],
            exports: 'toastr'
        },
        'debug': {
            exports: 'debug'
        }
    }
});

// create controller stub for "home", which is assigned in the DOM
function home() {}

// bootstrap angular app in requirejs
require(['angular', 'app'],
    function (angular) {
        angular.bootstrap(document, ['app']);
    }
);
