//TODO: Add lazy loading controllers
define('app', ['angular', 'security', 'config', 'routingConfig'
    , 'customRouteProvider', 'angular-resource', 'angular-route', 'bootstrap', 'services/services', 'directives'
    , 'controllers/dashboard' // TODO: Dynamically load controllers
    , 'controllers/lineups'
    , 'controllers/groups'
    , 'controllers/subscribers'
    , 'amplify-angular' // replaces the amplify $.get with angular $http
    , 'httpRequestTracker'
    , 'security.login.toolbar'
], function (angular, security, config) {
    'use strict';

    var debug = config.debug;
    var toasts = config.messages;
    var toastr = config.toastr;

   var app = angular.module('app', ['ngResource', 'security','services', 'directives', 'controllers', 'services.customRouteProvider', 'services.httpRequestTracker'])
      .config(['$locationProvider', '$httpProvider', '$routeProvider', 'customRouteProvider', 'securityAuthorizationProvider', function ($locationProvider, $httpProvider, $routeProvider, customRouteProvider, securityAuthorizationProvider, $log) {
         // work around for $http CORS fail
//         delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $locationProvider.html5Mode(true);

            customRouteProvider.routes('/controllers', '/views')
               .addRoute({
               name: 'dashboard',
               url: '/Dashboard',
               access: securityAuthorizationProvider.requireAuthenticatedUser
               })
               .addRoute({
                  name: 'lineups',
                  url: '/Lineups',
                  access: securityAuthorizationProvider.requireAuthenticatedUser
               })
               .addRoute({
                  name: 'subscribers',
                  url: '/Subscribers',
                  access: securityAuthorizationProvider.requireAuthenticatedUser
               })
               .addRoute({
                  name: 'groups',
                  url: '/Groups',
                  access: securityAuthorizationProvider.requireAuthenticatedUser
               })
            .otherwise({ redirectTo: '/Dashboard' });
      }])
      .run(['security', '$rootScope', function(security, $rootScope) {
         // Get the current user when the application starts
         // (in case they are still logged in from a previous session)
         console.log("app.run calling requestCurrentUser");
         $rootScope.Customer = security.requestCurrentUser();
      }]);

    app.controller('app', ['$rootScope', '$scope',
        function ($rootScope, $scope) {
            debug.log("[controller.home] running.");

            $scope.CustomerDetails = {};

            $scope.$on('$routeChangeError', function(event, current, previous, rejection){
//                    i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
                debug.log("$routeChangeError occurred, but at least we are routing.");
            });

            // TODO: Add notifications from sample app?
//                $scope.notifications = i18nNotifications;
//
//                $scope.removeNotification = function (notification) {
//                    i18nNotifications.remove(notification);
//                };
//                $scope.$on('$routeChangeError', function(event, current, previous, rejection){
//                    i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
//                });
        }]);

    // TODO: Add breadcrumbs?
    app.controller('header', ['$scope', '$location', '$route', 'security', 'httpRequestTracker', // 'breadcrumbs', 'notifications',
        function ($scope, $location, $route, security, httpRequestTracker) { // breadcrumbs, notifications,
//            $scope.location = $location;
//            $scope.breadcrumbs = breadcrumbs;

            $scope.showAccountSettings = false;
            $scope.currentUser = security.requestCurrentUser();
            $scope.brandImage = function() {
                switch ($scope.currentUser.CustomerGuid) {
                    case 'Wake Forest University':
                        return '/img/Wake_Forest_University_Logo.svg';
                    default:
                        return '/img/Wake_Forest_University_Logo.svg'; //'/img/brand.jpg';
                }
            };
            $scope.saveAccountSettings = function () {
                toastr.error("saveAccountSettings not implemented yet", "Warning!");
                $scope.showAccountSettings = false;
            };
            $scope.hideAccountSettings = function () {
                $scope.showAccountSettings = false;
                $("#accountSettingsModal").hide(); // to work around IE bug
            };
            $scope.ShowAccountSettingsModal = function () {
                security.requestCurrentUser().then(function (localUser) {
                    console.log("$scope.currentUser", localUser);
                    $scope.accountSettings = {
                        Username: localUser.Username,
                        OldPassword: "",
                        NewPassword: "",
                        NewPasswordRepeat: "",
                        CustomerId: localUser.CustomerID,
                        CustomerGuid: localUser.CustomerGuid

                    };
                    $scope.showDetails = false;
                    $scope.showAccountSettings = true;
                    $("#accountSettingsModal").show(); // to work around IE bug
                });
            };

            $scope.isAuthenticated = security.isAuthenticated;
            $scope.isAdmin = security.isAdmin;

            $scope.home = function () {
                if (security.isAuthenticated()) {
                    // set default route
                    debug.log("$scope.home: User is authenticated, redirecting to /LicenseOverView");
                    $location.path('/LicenseOverview');
                }
//                else {
//                    $location.path('/projectsinfo');
//                }
            };

            $scope.isNavbarActive = function (navBarPath) {
                return ($location.$$path === "/" + navBarPath);
//                return navBarPath === breadcrumbs.getFirst().name;
            };

            $scope.hasPendingRequests = function () {
                return httpRequestTracker.hasPendingRequests();
            };
        }
    ]);

    return app;
});
