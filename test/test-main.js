var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    paths: {
        // libraries and frameworks
        'angular'               : 'libs/angular/angular',
        'angular-resource'      : 'libs/angular-resource/angular-resource',
        'angular-route'         : 'libs/angular-route/angular-route',
        'angular-mocks'         : 'libs/angular-mocks/angular-mocks',
//        'angular-sanitize'      : './libs/angular-sanitize/angular-sanitize.min',
        'amplify'               : 'libs/amplify/lib/amplify.min',
        'amplify-angular'       : 'services/amplify-angular',
        'config'                : 'config',
        'app'                   : 'app',
        'bootstrap'             : 'libs/bootstrap/dist/js/bootstrap',
        'toastr'                : 'libs/toastr/toastr.min',
        'jQuery'                : 'libs/jquery/jquery',
        'lodash'                : 'libs/lodash/dist/lodash',
        'debug'                 : 'libs/javascript-debug/ba-debug',

        // Based on the sample app in the book by Pawel Kozlowski and Peter Bacon Darwin:
        // "Mastering Web Application Development with AngularJS"
        'security'              : 'services/security/index',
        'security.service'      : 'services/security/security',
        'security.interceptor'  : 'services/security/interceptor',
        'security.authorization': 'services/security/authorization',
        'security.retryQueue'   : 'services/security/retryQueue',
        'security.login'        : 'services/security/login/login',
        'security.login.form'   : 'services/security/login/loginForm',
        'security.login.toolbar': 'services/security/login/toolbar',
        'httpRequestTracker'    : 'services/httpRequestTracker',


        // custom
        'routingConfig'         : 'routes/routingConfig',
        'customRouteProvider'   : 'routes/customRouteProvider',
        'directives'            : 'directives/directives',
        'routes'                : 'routes/routes',
        'ui.bootstrap.dialog'   : 'directives/ui.bootstrap.dialog',
        'dataContext'           : 'services/datacontext',
        'dataService'           : 'services/dataService',
        'dataService.Subscribers': 'services/dataService.Subscribers',
        'dataService.Groups'    : 'services/dataService.Groups',
        'dataService.Package'   : 'services/dataService.Package',
        'dataService.Channel'   : 'services/dataService.Channel',
        'dataService.Lineups'   : 'services/dataService.Lineups',
        'services.utils'        : 'services/services.utils',
        'mocks'                 : 'test/mock/mockData'
    },

    shim: {
        'app': {
            exports: 'app'
        },
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
        'angular-mocks': {
            deps: ['angular'],
            exports: 'angular-mocks'
        },
        'bootstrap': {
            deps: ['jQuery'],
            exports: 'bootstrap'
        },
        'jQuery': { exports: 'jQuery' },
        'lodash': { exports: '_' },
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
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});