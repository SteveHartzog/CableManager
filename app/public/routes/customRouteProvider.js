define(['angular', 'angular-route'], function (angular) {
    'use strict';

    (function() {

        function customRouteProvider($routeProvider) {

            // This $get noop is because at the moment in AngularJS "providers" must provide something
            // via a $get method.
            // When AngularJS has "provider helpers" then this will go away!
            this.$get = angular.noop;

            // Again, if AngularJS had "provider helpers" we might be able to return `routesFor()` as the
            // customRouteProvider itself.  Then we would have a much cleaner syntax and not have to do stuff
            // like:
            //
            // ```
            // myMod.config(function(customRouteProvider) {
            //   var routeProvider = customRouteProvider.routesFor('MyBook', '/myApp');
            // });
            // ```
            //
            // but instead have something like:
            //
            //
            // ```
            // myMod.config(function(customRouteProvider) {
            //   var routeProvider = customRouteProvider('MyBook', '/myApp');
            // });
            // ```
            //
            // In any case, the point is that this function is the key part of this "provider helper".
            // We use it to create routes for CRUD operations.  We give it some basic information about
            // the resource and the urls then it it returns our own special routeProvider.
            this.routes = function(controllersDirectory, viewsDirectory) {
                console.log('customRouteProvider.routes called');
            // function(resourceName, urlPrefix, routePrefix) {
//                var baseUrl = resourceName.toLowerCase();
//                var baseRoute = '/' + resourceName.toLowerCase();
//                routePrefix = routePrefix || urlPrefix;
                // Prepend the urlPrefix if available.
//                if ( angular.isString(urlPrefix) && urlPrefix !== '' ) {
//                    baseUrl = urlPrefix + '/' + baseUrl;
//                }
                // Prepend the routePrefix if it was provided;
//                if (routePrefix !== null && routePrefix !== undefined && routePrefix !== '') {
//                    baseRoute = '/' + routePrefix + baseRoute;
//                }
                // Create the templateUrl for a route to our resource that does the specified operation.
                var resolveView = function(route) {
                    if (route.url) {
                        return viewsDirectory + route.url + '.html';
                    } else {
                        // default url
                        return viewsDirectory + '/' + route.name + '.html';
                    }
                };
                // Create the controller name for a route to our resource that does the specified operation.
                // then "resolve" the controller
                var resolveController = function(route) {
                    if (route.controller) {
                        return controllersDirectory + '/' + route.controller + '.js';
                    } else {
                        return controllersDirectory + '/' + route.name + '.js';
                    }
                };
                var getControllerName = function(route) {
                    if (route.controller) {
                        return route.controller;
                    } else {
                        return route.name;
                    }
                };
                // This is the object that our `routes()` function returns.  It decorates `$routeProvider`,
                // delegating the `when()` and `otherwise()` functions but also exposing some new functions for
                // simplified routes with authentication/authorization
                var routeBuilder = {
                    //TODO: Add lazyloading? taking passed security access level for route
                    addRoute: function(route) {
                        routeBuilder.when(route.url, {
                            templateUrl: resolveView(route)
                            , controller: getControllerName(route)
                            , resolve: route.access
                        });
                        return routeBuilder;
                    },
                    // Pass-through to `$routeProvider.when()`
                    when: function(path, route) {
                        $routeProvider.when(path, route);
                        return routeBuilder;
                    },
                    // Pass-through to `$routeProvider.otherwise()`
                    otherwise: function(params) {
                        $routeProvider.otherwise(params);
                        return routeBuilder;
                    },
                    // Access to the core $routeProvider.
                    $routeProvider: $routeProvider
                };
                return routeBuilder;

            };
        }
        // Currently, v1.0.3, AngularJS does not provide annotation style dependencies in providers so,
        // we add our injection dependencies using the $inject form
        customRouteProvider.$inject = ['$routeProvider'];

        // Create our provider - it would be nice to be able to do something like this instead:
        //
        // ```
        // angular.module('services.customRouteProvider', [])
        //   .configHelper('customRouteProvider', ['$routeProvider, customRouteProvider]);
        // ```
        // Then we could dispense with the $get, the $inject and the closure wrapper around all this.
        angular.module('services.customRouteProvider', ['ngRoute']).provider('customRoute', customRouteProvider);
    })();
});

