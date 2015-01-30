define(['angular', 'app', 'security', 'mocks', 'config', 'jQuery', 'lodash', 'controllers/dashboard', 'angular-mocks', 'angular-resource', 'angular-route'], function (angular, app, security, mockData, config, $, _, dashboard) {
   'use strict';
   xdescribe('controllers.dashboard', function() {
      var scope, mockSecurity, $httpBackend;

      // mock app to allow us to inject our own dependencies
      beforeEach(angular.mock.module('app'));

      // mock the controller for the same reason and include $rootScope and $controller
      beforeEach(angular.mock.inject(function ($rootScope, $controller, security) {
//         $httpBackend = _$httpBackend_;
         // $httpBackend.when('GET', 'Users/users.json').response([{id:1},{id:2}]);
         // create an empty scope
         scope = $rootScope.$new();
         mockSecurity = security;
         mockSecurity.currentUser = mockData.user;
         // sets other values
         config.useMocks = true;

         // declare the controller and inject our empty scope
         $controller('dashboard', {$scope: scope, security: mockSecurity});
      }));

      it('gets package data', function() {
         expect(scope.privatePackages.length).toBe(4);
         expect(scope.publicPackages.length).toBe(5);
         expect(scope.commonPackages.length).toBe(4);
      });
   });
});