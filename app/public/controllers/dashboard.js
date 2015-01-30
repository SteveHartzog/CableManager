define(['config', 'controllers/controllers', 'jQuery', 'services.utils', 'dataContext', 'services/services'],
    function (config, controllers, $, utils, dc) {
        'use strict';

        var debug = config.debug;
        var toastr = config.toastr;
        var toasts = config.messages;

        controllers.controller('dashboard', ['security', '$rootScope', '$scope', '$location', function (security, $rootScope, $scope) {
            debug.log("[controller.dashboard] running.");

            $scope.isLoaded = false;
            $scope.privatePackages = [];
            $scope.publicPackages = [];
            $scope.commonPackages = [];

            function init() {
                // confirm page access
                $.when(dc.packages.getData()).done(function (data) {
                    $scope.privatePackages = data.privatePackages;
                    $scope.publicPackages = data.publicPackages;
                    $scope.commonPackages = data.commonPackages;
                    $scope.isLoaded = true;
                    $scope.$apply();
                    if ($rootScope.isDashboardCached === undefined) {
                        toastr.info(toasts.dataLoaded, "Dashboard");
                        $rootScope.isDashboardCached = true;
                    }
                }).fail(function (error) {
                    utils.handleError({
                        error: error,
                        security: security,
                        dataContext: dc
                    });
                });
            }
            init();
        }]);
    }
);