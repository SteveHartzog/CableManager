define(['angular', 'app', 'security', 'mocks', 'config', 'jQuery', 'lodash', 'controllers/lineups', 'angular-mocks', 'angular-resource', 'angular-route'], function (angular, app, security, mockData, config, $, _, dashboard) {
   'use strict';
   xdescribe('controllers.lineups', function() {
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
         // declare the controller and inject our empty scope
         config.useMocks = true;
         $controller('lineups', {$scope: scope, security: mockSecurity});
      }));

      it('gets package data and lineups', function() {
         dump("allCustomerPackages: ", scope.allCustomerPackages);
//         expect(scope.allCustomerPackages.privatePackages.length).toBe(4);
//         expect(scope.allCustomerPackages.publicPackages.length).toBe(5);
//         expect(scope.allCustomerPackages.commonPackages.length).toBe(4);
         expect(scope.allLineups.length).toBe(12);
      });
   });
});