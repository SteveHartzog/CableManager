define(['angular', 'security', 'directives'], function (angular) {
    'use strict';

    console.log("<login-toolbar/> loaded.");
    angular.module('security.login.toolbar', [])
    // The loginToolbar directive is a reusable widget that can show login or logout buttons
    // and information the current authenticated user
    .directive('loginToolbar', ['security', function(security) {
        console.log("loginToolbar, security", security);
      var directive = {
        templateUrl: '/services/security/login/toolbar.html',
        restrict: 'E',
        replace: true,
        scope: true,
        link: function($scope, $element, $attrs, $controller) {
          $scope.isAuthenticated = security.isAuthenticated;
          $scope.login = security.showLogin;
          $scope.logout = security.logout;
          $scope.$watch(function() {
            return security.currentUser;
          }, function(currentUser) {
            $scope.currentUser = currentUser;
          });
        }
      };
      return directive;
    }]);
});