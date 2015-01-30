define([], function () {
    'use strict';

    var services = angular.module('routeResolverServices', []);

    // must be a provider since it will be injected into module.config()
    services.provider('routeResolver', function () {
        this.$get = function () {
            return this;
        };

        this.routeConfig = function () {
            var controllersDirectory = '/js/controllers/';
            var viewsDirectory = '/templates/';

            var setBaseDirectories = function (viewsDir, controllersDir) {
                viewsDirectory = viewsDir;
                controllersDirectory = controllersDir;
            }
            var getControllersDirectory = function () {
                return controllersDirectory;
            };
            var getViewsDirectory = function () {
                return viewsDirectory;
            }

            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }();

        this.route = function (routeConfig) {
            var resolve = function (baseName) {
                var routeDef = {};
                routeDef.templateUrl = routeConfig.getViewsDirectory() + baseName + '.html';
                routeDef.controller = baseName = 'Controller';
                routeDef.resolve = {
                    load: ['$q', '$rootScope', function ($q, $rootScope) {
                        var dependencies = [routeConfig.getControllersDirectory() + baseName + 'Controller.js'];
                        return resolveDependencies($q, $rootScope, dependencies);
                    }]
                };

                return routeDef;
            }
            var resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply();
                });

                return defer.promise;
            };

            return {
                resolve: resolve
            }
        }(this.routeConfig);
    });
});